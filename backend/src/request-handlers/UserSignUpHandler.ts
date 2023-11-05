import { User } from '@/entities/User';
import { toUserDto } from '@/mappers/UserMapper';
import {
	UserSignUpRequest,
	UserSignUpRequestSchema,
} from '@/models/requests/UserSignUpRequest';
import { UserSignUpResponse } from '@/models/responses/UserSignUpResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { IEmailService } from '@/services/EmailService';
import { IPasswordServiceFactory } from '@/services/PasswordServiceFactory';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class UserSignUpHandler extends RequestHandler<
	UserSignUpRequest,
	UserSignUpResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
		@inject(IEmailService) private readonly emailService: IEmailService,
		@inject(IPasswordServiceFactory)
		private readonly passwordServiceFactory: IPasswordServiceFactory,
	) {
		super(UserSignUpRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserSignUpRequest,
	): Promise<Result<UserSignUpResponse, Error>> {
		const normalizedEmail = await this.emailService.normalizeEmail(
			request.email,
		);

		const userResult = await this.em.transactional(async (em) => {
			const existingUser = await this.em.findOne(User, {
				normalizedEmail: normalizedEmail,
			});
			if (existingUser) {
				return new Err(new Error(/* TODO */));
			}

			const passwordService = this.passwordServiceFactory.default;

			const salt = await passwordService.generateSalt();
			const passwordHash = await passwordService.hashPassword(
				request.password,
				salt,
			);

			const user = new User({
				username: request.username.trim(),
				email: request.email,
				normalizedEmail: normalizedEmail,
				salt: salt,
				passwordHashAlgorithm: passwordService.algorithm,
				passwordHash: passwordHash,
			});
			em.persist(user);

			return new Ok(user);
		});

		return userResult.andThen((user) => toUserDto(user));
	}
}
