import { User } from '@/entities/User';
import { EntityManager } from '@mikro-orm/core';
import { inject } from 'yohira';

export const ICurrentUserService = Symbol.for('ICurrentUserService');
export interface ICurrentUserService {
	getCurrentUser(): Promise<User | undefined>;
}

export class CurrentUserService implements ICurrentUserService {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {}

	// TODO: implement
	async getCurrentUser(): Promise<User | undefined> {
		// TODO: remove
		const users = await this.em.find(User, {});
		if (users.length === 0) {
			return undefined;
		}
		return users[0];
	}
}
