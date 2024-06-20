import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.user.application';
import { UserUser } from '@shiori.link/server.user.domain';
import { ClaimsIdentity, IHttpContext, inject } from 'yohira';

export class CurrentUserService implements ICurrentUserService {
	constructor(@inject(IEntityManager) private readonly em: EntityManager) {}

	async getCurrentUser(
		httpContext: IHttpContext,
	): Promise<UserUser | undefined> {
		const identity = httpContext.user.identity;
		if (!(identity instanceof ClaimsIdentity)) {
			return undefined;
		}

		const name = identity.name;
		if (typeof name !== 'string') {
			return undefined;
		}

		const user = await this.em.findOne(UserUser, {
			username: name,
		});

		return user ?? undefined;
	}
}
