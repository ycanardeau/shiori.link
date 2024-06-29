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

export const MonolithNoteSchema = new EntitySchema<MonolithNote>({
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

export const MonolithBookmarkNoteSchema = new EntitySchema<
	MonolithBookmarkNote,
	MonolithNote
>({
	class: MonolithBookmarkNote,
	extends: MonolithNoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Bookmark,
	properties: {},
});

export const MonolithMarkdownNoteSchema = new EntitySchema<
	MonolithMarkdownNote,
	MonolithNote
>({
	class: MonolithMarkdownNote,
	extends: MonolithNoteSchema,
	// schema: 'monolith',
	tableName: 'notes',
	discriminatorValue: NoteType.Markdown,
	properties: {},
});
