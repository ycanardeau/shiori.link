import { User } from '@/entities/User';
import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

@Entity({ tableName: 'notebooks' })
export class Notebook {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property()
	deleted = false;

	@ManyToOne()
	user: Ref<User>;

	@Property()
	name: string;

	constructor(user: User, name: string) {
		this.user = ref(user);
		this.name = name;
	}
}
