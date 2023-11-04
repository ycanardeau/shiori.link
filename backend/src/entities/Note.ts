import { NoteExternalLink } from '@/entities/ExternalLink';
import { Notebook } from '@/entities/Notebook';
import { User } from '@/entities/User';
import {
	BookmarkNotePayloadDto,
	MarkdownNotePayloadDto,
	NotePayloadDto,
} from '@/models/dto/NoteDto';
import { IUserOwnedEntity } from '@/models/entities/IUserOwnedEntity';
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

@Entity({
	tableName: 'notes',
	abstract: true,
	discriminatorColumn: 'type',
})
export abstract class Note<
	TNoteType extends NoteType = NoteType,
	TNotePayloadDto extends NotePayloadDto = NotePayloadDto,
> implements IUserOwnedEntity
{
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

	constructor(notebook: Notebook, payload: TNotePayloadDto) {
		this.user = notebook.user;
		this.notebook = ref(notebook);
		this.text = JSON.stringify(payload);
	}

	get payload(): TNotePayloadDto {
		return JSON.parse(this.text);
	}
}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
})
export class BookmarkNote extends Note<
	NoteType.Bookmark,
	BookmarkNotePayloadDto
> {}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
})
export class MarkdownNote extends Note<
	NoteType.Markdown,
	MarkdownNotePayloadDto
> {}
