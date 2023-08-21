import { JSONSchemaType } from 'ajv';

export interface BookmarkNoteCreateRequest {
	notebookId: number;
	url: string;
	title?: string;
}

export const BookmarkNoteCreateRequestSchema: JSONSchemaType<BookmarkNoteCreateRequest> =
	{
		type: 'object',
		properties: {
			notebookId: {
				type: 'integer',
			},
			url: {
				type: 'string',
			},
			title: {
				type: 'string',
				nullable: true,
			},
		},
		required: ['notebookId', 'url'],
	};
