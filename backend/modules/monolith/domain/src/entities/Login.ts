import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

import { IUserOwnedEntity, User } from './User';

@Entity({ tableName: 'logins' })
export class Login implements IUserOwnedEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@ManyToOne(() => User)
	user: Ref<User>;

	@Property()
	ip: string;

	@Property()
	success: boolean;

	constructor(user: User, ip: string, success: boolean) {
		this.user = ref(user);
		this.ip = ip;
		this.success = success;
	}
}
