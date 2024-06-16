import { EntitySchema, Ref } from '@mikro-orm/core';
import {
	BookmarkNote,
	MarkdownNote,
	Note,
	Notebook,
	NoteExternalLink,
	NoteType,
	User,
} from '@shiori.link/server.monolith.domain';

export const NoteSchema = new EntitySchema<Note>({
	class: Note,
	// schema: 'monolith',
	tableName: 'notes',
	abstract: true,
	discriminatorColumn: 'type',
	properties: {
		id: {
			type: 'number',
			primary: true,
		},
		createdAt: {
			type: 'datetime',
		},
		type: {
			enum: true,
			items: (): typeof NoteType => NoteType,
		},
		user: {
			kind: 'm:1',
			entity: (): typeof User => User,
			ref: true,
		},
		notebook: {
			kind: 'm:1',
			entity: (): typeof Notebook => Notebook,
			ref: true,
		},
		text: {
			type: 'text',
		},
		externalLinks: {
			kind: '1:m',
			entity: (): typeof NoteExternalLink => NoteExternalLink,
			mappedBy: (externalLink): Ref<Note> => externalLink.note,
		},
	},
});

export const BookmarkNoteSchema = new EntitySchema<BookmarkNote, Note>({
	class: BookmarkNote,
	extends: NoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
	properties: {},
});

export const MarkdownNoteSchema = new EntitySchema<MarkdownNote, Note>({
	class: MarkdownNote,
	extends: NoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
	properties: {},
});
