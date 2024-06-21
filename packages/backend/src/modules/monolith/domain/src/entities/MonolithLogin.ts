import { Ref, ref } from '@mikro-orm/core';

import { IUserOwnedEntity, MonolithUser } from './MonolithUser';

export class MonolithLogin implements IUserOwnedEntity {
	id!: number;
	createdAt = new Date();
	user: Ref<MonolithUser>;
	ip: string;
	success: boolean;

	constructor(user: MonolithUser, ip: string, success: boolean) {
		this.user = ref(user);
		this.ip = ip;
		this.success = success;
	}
}
