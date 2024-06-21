import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import { MonolithUser } from '@shiori.link/server.monolith.domain';
import { ClaimsIdentity, IHttpContext, inject } from 'yohira';

export class CurrentUserService implements ICurrentUserService {
	constructor(@inject(IEntityManager) private readonly em: EntityManager) {}

	async getCurrentUser(
		httpContext: IHttpContext,
	): Promise<MonolithUser | undefined> {
		const identity = httpContext.user.identity;
		if (!(identity instanceof ClaimsIdentity)) {
			return undefined;
		}

		const name = identity.name;
		if (typeof name !== 'string') {
			return undefined;
		}

		const user = await this.em.findOne(MonolithUser, {
			username: name,
		});

		return user ?? undefined;
	}
}
