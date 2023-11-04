import { User } from '@/entities/User';
import { IUserOwnedEntity } from '@/models/entities/IUserOwnedEntity';
import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

@Entity({ tableName: 'logins' })
export class Login implements IUserOwnedEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@ManyToOne()
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
