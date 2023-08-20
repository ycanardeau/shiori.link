import { NoteExternalLink } from '@/entities/ExternalLink';
import { Notebook } from '@/entities/Notebook';
import { User } from '@/entities/User';
import {
	BookmarkNoteDataDto,
	MarkdownNoteDataDto,
	NoteDataDto,
} from '@/models/dto/NoteDto';
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
	TNoteDataDto extends NoteDataDto = NoteDataDto,
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

	constructor(notebook: Notebook, data: TNoteDataDto) {
		this.user = notebook.user;
		this.notebook = ref(notebook);
		this.text = JSON.stringify(data);
	}

	get data(): TNoteDataDto {
		return JSON.parse(this.text);
	}
}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
})
export class BookmarkNote extends Note<
	NoteType.Bookmark,
	BookmarkNoteDataDto
> {}

@Entity({
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
})
export class MarkdownNote extends Note<
	NoteType.Markdown,
	MarkdownNoteDataDto
> {}
