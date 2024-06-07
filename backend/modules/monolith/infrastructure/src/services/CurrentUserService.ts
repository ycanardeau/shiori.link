import { EntityManager } from '@mikro-orm/core';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import { User } from '@shiori.link/server.monolith.domain';
import { ClaimsIdentity, IHttpContext, inject } from '@yohira/app';

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
