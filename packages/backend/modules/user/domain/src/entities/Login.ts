import { Ref, ref } from '@mikro-orm/core';

import { IUserOwnedEntity, User } from './User';

export class Login implements IUserOwnedEntity {
	id!: number;
	createdAt = new Date();
	user: Ref<User>;
	ip: string;
	success: boolean;

	constructor(user: User, ip: string, success: boolean) {
		this.user = ref(user);
		this.ip = ip;
		this.success = success;
	}
}
