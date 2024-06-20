import { Ref, ref } from '@mikro-orm/core';

import { IUserOwnedEntity, MonolithUser } from './MonolithUser';

export class MonolithContact implements IUserOwnedEntity {
	id!: number;
	createdAt = new Date();
	user: Ref<MonolithUser>;
	name: string;

	constructor(user: MonolithUser, name: string) {
		this.user = ref(user);
		this.name = name;
	}
}
