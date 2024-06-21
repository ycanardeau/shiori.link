import { Ref, ref } from '@mikro-orm/core';

import { IUserOwnedEntity, UserUser } from './UserUser';

export class UserLogin implements IUserOwnedEntity {
	id!: number;
	createdAt = new Date();
	user: Ref<UserUser>;
	ip: string;
	success: boolean;

	constructor(user: UserUser, ip: string, success: boolean) {
		this.user = ref(user);
		this.ip = ip;
		this.success = success;
	}
}
