import { NoteExternalLink } from '@/entities/ExternalLink';
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

	@OneToMany(() => NoteExternalLink, (externalLink) => externalLink.note)
	externalLinks = new Collection<NoteExternalLink>(this);

	@ManyToOne()
	root: Ref<Note> | undefined;

	@ManyToOne()
	parent: Ref<Note> | undefined;

	@OneToMany(() => Note, (note) => note.root)
	ancestors = new Collection<Note>(this);

	constructor(user: User, text: string, parent: Note | undefined) {
		this.user = ref(user);
		this.text = text;
		this.root =
			parent !== undefined ? parent.root ?? ref(parent) : undefined;
		this.parent = parent !== undefined ? ref(parent) : undefined;
	}
}
