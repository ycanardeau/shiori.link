import { NoteExternalLink } from '@/entities/ExternalLink';
import { User } from '@/entities/User';
import { NoteType } from '@/models/enums/NoteType';
import {
	Collection,
	Entity,
	Enum,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

interface BookmarkNoteData {
	url: string;
	title: string | undefined;
}

interface MarkdownNoteData {
	text: string;
}

type NoteData = BookmarkNoteData | MarkdownNoteData;

@Entity({
	tableName: 'notes',
	abstract: true,
	discriminatorColumn: 'type',
})
export abstract class Note<TData extends NoteData = NoteData> {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Enum(() => NoteType)
	type!: NoteType;

	@ManyToOne()
	user: Ref<User>;

	@Property({ columnType: 'text' })
	text: string;

	@OneToMany(() => NoteExternalLink, (externalLink) => externalLink.note)
	externalLinks = new Collection<NoteExternalLink>(this);

	constructor(user: User, data: TData) {
		this.user = ref(user);
		this.text = JSON.stringify(data);
	}

	get data(): TData {
		return JSON.parse(this.text);
	}
}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
})
export class BookmarkNote extends Note<BookmarkNoteData> {}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
})
export class MarkdownNote extends Note<MarkdownNoteData> {}
