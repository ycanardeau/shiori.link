import { User } from '@/entities/User';
import { EntityManager } from '@mikro-orm/core';
import { ClaimsIdentity, IHttpContext, inject } from 'yohira';

export const ICurrentUserService = Symbol.for('ICurrentUserService');
export interface ICurrentUserService {
	getCurrentUser(httpContext: IHttpContext): Promise<User | undefined>;
}

export class CurrentUserService implements ICurrentUserService {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {}

	async getCurrentUser(httpContext: IHttpContext): Promise<User | undefined> {
		const identity = httpContext.user.identity;
		if (!(identity instanceof ClaimsIdentity)) {
			return undefined;
		}

		const name = identity.name;
		if (typeof name !== 'string') {
			return undefined;
		}

		const user = await this.em.findOne(User, {
			username: name,
		});

		return user ?? undefined;
	}
}
