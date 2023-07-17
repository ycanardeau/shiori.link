import { User } from '@/entities/User';
import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

@Entity({ tableName: 'contacts' })
export class Contact {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@ManyToOne()
	user: Ref<User>;

	@Property()
	firstName: string;

	@Property()
	lastName: string;

	constructor(user: User, firstName: string, lastName: string) {
		this.user = ref(user);
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
