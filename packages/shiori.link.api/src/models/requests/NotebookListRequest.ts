import { PageQuery } from '@/models/requests/PageQuery';
import { JSONSchemaType } from 'ajv';

export enum NotebookListSort {
	CreatedAtDesc = 'CreatedAtDesc',
}

export type NotebookListRequest = PageQuery<NotebookListSort>;

export const NotebookListRequestSchema: JSONSchemaType<NotebookListRequest> = {
	type: 'object',
	properties: {
		sort: {
			type: 'string',
			enum: Object.values(NotebookListSort),
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
