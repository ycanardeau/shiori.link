import { Login } from '@/entities/Login';
import { User } from '@/entities/User';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toUserDto } from '@/mappers/UserMapper';
import {
	UserLoginRequest,
	UserLoginRequestSchema,
} from '@/models/requests/UserLoginRequest';
import { UserLoginResponse } from '@/models/responses/UserLoginResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { IPasswordServiceFactory } from '@/services/PasswordServiceFactory';
import { EntityManager } from '@mikro-orm/core';
import {
	AuthenticationProperties,
	Claim,
	ClaimTypes,
	ClaimsIdentity,
	ClaimsPrincipal,
	CookieAuthenticationDefaults,
	Err,
	IHttpContext,
	Ok,
	Result,
	inject,
	signIn,
} from 'yohira';

export class UserLoginHandler extends RequestHandler<
	UserLoginRequest,
	UserLoginResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
		@inject(IPasswordServiceFactory)
		private readonly passwordServiceFactory: IPasswordServiceFactory,
	) {
		super(UserLoginRequestSchema);
	}

	// TODO
	async handle(
		httpContext: IHttpContext,
		request: UserLoginRequest,
	): Promise<Result<UserLoginResponse, NotFoundError | UnauthorizedError>> {
		const userResult = await this.em.transactional(async (em) => {
			const user = await this.em.findOne(User, {
				username: request.username,
			});

			if (!user) {
				return new Err(new NotFoundError());
			}

			const passwordService = this.passwordServiceFactory.create(
				user.passwordHashAlgorithm,
			);

			const passwordHash = await passwordService.hashPassword(
				request.password,
				user.salt,
			);

			const success = passwordHash === user.passwordHash;

			const login = new Login(user, '' /* TODO: ip */, success);

			em.persist(login);

			return success ? new Ok(user) : new Err(new UnauthorizedError());
		});

		if (userResult.err) {
			return userResult;
		}

		const user = userResult.val;

		const userDtoResult = toUserDto(user);

		if (userDtoResult.err) {
			return userDtoResult;
		}

		const userDto = userDtoResult.val;

		const claims: Claim[] = [new Claim(ClaimTypes.name, userDto.username)];

		const claimsIdentity = new ClaimsIdentity(
			undefined,
			claims,
			CookieAuthenticationDefaults.authenticationScheme,
			undefined,
			undefined,
		);

		const authProperties = new AuthenticationProperties(
			undefined,
			undefined,
		);

		await signIn(
			httpContext,
			CookieAuthenticationDefaults.authenticationScheme,
			ClaimsPrincipal.fromIdentity(claimsIdentity),
			authProperties,
		);

		return new Ok(userDto);
	}
}
