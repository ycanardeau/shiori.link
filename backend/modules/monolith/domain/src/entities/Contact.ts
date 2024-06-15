import { Ref, ref } from '@mikro-orm/core';

import { IUserOwnedEntity, User } from './User';

export class Contact implements IUserOwnedEntity {
	id!: number;
	createdAt = new Date();
	user: Ref<User>;
	name: string;

	constructor(user: User, name: string) {
		this.user = ref(user);
		this.name = name;
	}
}
