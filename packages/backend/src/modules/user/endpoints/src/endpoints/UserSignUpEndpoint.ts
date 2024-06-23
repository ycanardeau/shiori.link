import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { IEventDispatcher } from '@shiori.link/server.shared';
import {
	IEmailService,
	IPasswordServiceFactory,
	UserCreatedEvent,
} from '@shiori.link/server.user.application';
import {
	UserSignUpRequest,
	UserSignUpRequestSchema,
	UserSignUpResponse,
} from '@shiori.link/server.user.contracts';
import { UserUser } from '@shiori.link/server.user.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { toUserDto } from '../mappers/UserMapper';
import { Endpoint } from './Endpoint';

export class UserSignUpEndpoint extends Endpoint<
	UserSignUpRequest,
	UserSignUpResponse
> {
	constructor(
		@inject(IEntityManager) private readonly em: EntityManager,
		@inject(IEmailService) private readonly emailService: IEmailService,
		@inject(IPasswordServiceFactory)
		private readonly passwordServiceFactory: IPasswordServiceFactory,
		//@inject(IMessageBroker) private readonly messageBroker: IMessageBroker,
		@inject(IEventDispatcher)
		private readonly eventDispatcher: IEventDispatcher,
	) {
		super(UserSignUpRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserSignUpRequest,
	): Promise<Result<JsonResult<UserSignUpResponse>, Error>> {
		const normalizedEmail = await this.emailService.normalizeEmail(
			request.email,
		);

		const userResult = await this.em.transactional(async (em) => {
			const existingUser = await this.em.findOne(UserUser, {
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

			const user = new UserUser({
				username: request.email.trim(),
				email: request.email.trim(),
				normalizedEmail: normalizedEmail,
				salt: salt,
				passwordHashAlgorithm: passwordService.algorithm,
				passwordHash: passwordHash,
			});
			em.persist(user);

			return new Ok(user);
		});

		if (userResult.ok) {
			const user = userResult.val;

			/*await this.messageBroker.publish(
				new UserCreatedEvent({
					id: user.id,
					username: user.username,
					email: user.email,
				}),
			);*/
			await this.eventDispatcher.dispatch(
				new UserCreatedEvent({
					id: user.id,
					username: user.username,
					email: user.email,
				}),
			);
		}

		return userResult
			.andThen((user) => toUserDto(user))
			.map((userDto) => new JsonResult(userDto));
	}
}
