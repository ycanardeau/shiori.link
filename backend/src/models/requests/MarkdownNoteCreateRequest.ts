import { JSONSchemaType } from 'ajv';

export interface MarkdownNoteCreateRequest {
	notebookId: number;
	text: string;
	urls: string[];
}

export const MarkdownNoteCreateRequestSchema: JSONSchemaType<MarkdownNoteCreateRequest> =
	{
		type: 'object',
		properties: {
			notebookId: {
				type: 'integer',
			},
			text: {
				type: 'string',
			},
			urls: {
				type: 'array',
				items: {
					type: 'string',
				},
			},
		},
		required: ['notebookId', 'text', 'urls'],
	};
