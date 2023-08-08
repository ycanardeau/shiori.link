import { NoteExternalLink } from '@/entities/ExternalLink';
import { Notebook } from '@/entities/Notebook';
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

interface ContactReferenceNoteData {
	contactId: number;
	firstName: string;
	lastName: string;
}

type NoteData = BookmarkNoteData | MarkdownNoteData | ContactReferenceNoteData;

@Entity({
	tableName: 'notes',
	abstract: true,
	discriminatorColumn: 'type',
})
export abstract class Note<
	TNoteType extends NoteType = NoteType,
	TNoteData extends NoteData = NoteData,
> {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Enum(() => NoteType)
	type!: TNoteType;

	@ManyToOne()
	user: Ref<User>;

	@ManyToOne()
	notebook: Ref<Notebook>;

	@Property({ columnType: 'text' })
	text: string;

	@OneToMany(() => NoteExternalLink, (externalLink) => externalLink.note)
	externalLinks = new Collection<NoteExternalLink>(this);

	constructor(notebook: Notebook, data: TNoteData) {
		this.user = notebook.user;
		this.notebook = ref(notebook);
		this.text = JSON.stringify(data);
	}

	get data(): TNoteData {
		return JSON.parse(this.text);
	}
}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
})
export class BookmarkNote extends Note<NoteType.Bookmark, BookmarkNoteData> {}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
})
export class MarkdownNote extends Note<NoteType.Markdown, MarkdownNoteData> {}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.ContactReference,
})
export class ContactReferenceNote extends Note<
	NoteType.ContactReference,
	ContactReferenceNoteData
> {}
