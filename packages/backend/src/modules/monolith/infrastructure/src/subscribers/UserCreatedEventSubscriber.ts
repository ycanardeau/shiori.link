import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { UserCreatedEvent } from '@shiori.link/server.monolith.application';
import { MonolithUser } from '@shiori.link/server.monolith.domain';
import {
	IEventSubscriber,
	IEventSubscriberMeta,
} from '@shiori.link/server.shared';
import { inject } from 'yohira';

export class UserCreatedEventSubscriber implements IEventSubscriber {
	constructor(@inject(IEntityManager) private readonly em: EntityManager) {}

	onUserCreated({
		payload: { id, username, email },
	}: UserCreatedEvent): Promise<void> {
		return this.em.transactional(async (em) => {
			const user = new MonolithUser({
				userId: id,
				username: username,
				email: email,
			});

			em.persist(user);
		});
	}

	getSubscribedEvents(): IEventSubscriberMeta<this>[] {
		return [{ name: UserCreatedEvent.name, method: 'onUserCreated' }];
	}
}
