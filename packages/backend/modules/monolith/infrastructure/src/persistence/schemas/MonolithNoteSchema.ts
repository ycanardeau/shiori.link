import { EntitySchema, Ref } from '@mikro-orm/core';
import {
	MonolithBookmarkNote,
	MonolithMarkdownNote,
	MonolithNote,
	MonolithNotebook,
	MonolithNoteExternalLink,
	MonolithUser,
	NoteType,
} from '@shiori.link/server.monolith.domain';

export const NoteSchema = new EntitySchema<MonolithNote>({
	class: MonolithNote,
	schema: 'monolith',
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
			entity: (): typeof MonolithUser => MonolithUser,
			ref: true,
		},
		notebook: {
			kind: 'm:1',
			entity: (): typeof MonolithNotebook => MonolithNotebook,
			ref: true,
		},
		text: {
			type: 'text',
		},
		externalLinks: {
			kind: '1:m',
			entity: (): typeof MonolithNoteExternalLink =>
				MonolithNoteExternalLink,
			mappedBy: (externalLink): Ref<MonolithNote> => externalLink.note,
		},
	},
});

export const BookmarkNoteSchema = new EntitySchema<
	MonolithBookmarkNote,
	MonolithNote
>({
	class: MonolithBookmarkNote,
	extends: NoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
	properties: {},
});

export const MarkdownNoteSchema = new EntitySchema<
	MonolithMarkdownNote,
	MonolithNote
>({
	class: MonolithMarkdownNote,
	extends: NoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
	properties: {},
});
