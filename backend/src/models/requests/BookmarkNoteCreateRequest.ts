import { JSONSchemaType } from 'ajv';

export interface BookmarkNoteCreateRequest {
	url: string;
	title?: string;
}

export const BookmarkNoteCreateRequestSchema: JSONSchemaType<BookmarkNoteCreateRequest> =
	{
		type: 'object',
		properties: {
			url: {
				type: 'string',
			},
			title: {
				type: 'string',
				nullable: true,
			},
		},
		required: ['url'],
	};
