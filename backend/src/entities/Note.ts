import { User } from '@/entities/User';
import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

@Entity({ tableName: 'notes' })
export class Note {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@ManyToOne()
	user: Ref<User>;

	@Property({ columnType: 'text' })
	text: string;

	constructor(user: User, text: string) {
		this.user = ref(user);
		this.text = text;
	}
}
