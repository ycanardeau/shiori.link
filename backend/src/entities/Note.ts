import { ExternalLink } from '@/entities/ExternalLink';
import { User } from '@/entities/User';
import {
	Collection,
	Entity,
	ManyToOne,
	OneToMany,
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

	@OneToMany(() => ExternalLink, (externalLink) => externalLink.note)
	externalLinks = new Collection<ExternalLink>(this);

	constructor(user: User, text: string) {
		this.user = ref(user);
		this.text = text;
	}
}
