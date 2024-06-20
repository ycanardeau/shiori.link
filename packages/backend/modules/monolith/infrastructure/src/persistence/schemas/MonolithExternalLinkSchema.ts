import { EntitySchema } from '@mikro-orm/core';
import {
	MonolithExternalLink,
	MonolithNote,
	MonolithNoteExternalLink,
	MonolithUser,
} from '@shiori.link/server.monolith.domain';

export const ExternalLinkSchema = new EntitySchema<MonolithExternalLink>({
	class: MonolithExternalLink,
	schema: 'monolith',
	tableName: 'external_links',
	abstract: true,
	discriminatorColumn: 'discr',
	properties: {
		id: {
			type: 'number',
			primary: true,
		},
		user: {
			kind: 'm:1',
			entity: (): typeof MonolithUser => MonolithUser,
			ref: true,
		},
		url: {
			type: 'text',
		},
		scheme: {
			type: 'string',
		},
		host: {
			type: 'string',
		},
		reversedHost: {
			type: 'string',
		},
		port: {
			type: 'string',
		},
		path: {
			type: 'text',
		},
		query: {
			type: 'text',
		},
		fragment: {
			type: 'text',
		},
	},
});

export const NoteExternalLinkSchema = new EntitySchema<
	MonolithNoteExternalLink,
	MonolithExternalLink
>({
	class: MonolithNoteExternalLink,
	extends: ExternalLinkSchema,
	// schema: 'monolith',
	tableName: 'external_links',
	discriminatorValue: 'Note',
	properties: {
		note: {
			kind: 'm:1',
			entity: (): typeof MonolithNote => MonolithNote,
		},
	},
});
