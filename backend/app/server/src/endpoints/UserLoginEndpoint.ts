import { Endpoint } from '@/endpoints/Endpoint';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toUserDto } from '@/mappers/UserMapper';
import { EntityManager } from '@mikro-orm/core';
import { IPasswordServiceFactory } from '@shiori.link/server.monolith.application';
import {
	UserLoginRequest,
	UserLoginRequestSchema,
	UserLoginResponse,
} from '@shiori.link/server.monolith.contracts';
import { Login, User } from '@shiori.link/server.monolith.domain';
import {
	AuthenticationProperties,
	Claim,
	ClaimTypes,
	ClaimsIdentity,
	ClaimsPrincipal,
	CookieAuthenticationDefaults,
	Err,
	IHttpContext,
	JsonResult,
	Ok,
	Result,
	inject,
	signIn,
} from 'yohira';

export class UserLoginEndpoint extends Endpoint<
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
	): Promise<
		Result<
			JsonResult<UserLoginResponse>,
			DataNotFoundError | UnauthorizedError
		>
	> {
		const userResult = await this.em.transactional(async (em) => {
			const realIp = httpContext.request.headers['x-real-ip'];

			if (typeof realIp !== 'string') {
				return new Err(new UnauthorizedError());
			}

			const user = await this.em.findOne(User, {
				username: request.username,
			});

			if (!user) {
				return new Err(new DataNotFoundError());
			}

			const passwordService = this.passwordServiceFactory.create(
				user.passwordHashAlgorithm,
			);

			const passwordHash = await passwordService.hashPassword(
				request.password,
				user.salt,
			);

			const success = passwordHash === user.passwordHash;

			const login = new Login(user, realIp, success);

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

		return new Ok(new JsonResult(userDto));
	}
}
