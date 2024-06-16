import { JSONSchemaType } from 'ajv';

import { PageQuery } from './PageQuery';

export enum NoteListSort {
	CreatedAtAsc = 'CreatedAtAsc',
	CreatedAtDesc = 'CreatedAtDesc',
}

export type NoteListRequest = PageQuery<NoteListSort>;

export const NoteListRequestSchema: JSONSchemaType<NoteListRequest> = {
	type: 'object',
	properties: {
		sort: {
			type: 'string',
			enum: Object.values(NoteListSort),
			nullable: true,
		},
		perPage: {
			type: 'integer',
			nullable: true,
		},
		page: {
			type: 'integer',
			nullable: true,
		},
	},
};
