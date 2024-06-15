import { JSONSchemaType } from 'ajv';

export interface MarkdownNoteCreateRequest {
	text: string;
	urls: string[];
}

export const MarkdownNoteCreateRequestSchema: JSONSchemaType<MarkdownNoteCreateRequest> =
	{
		type: 'object',
		properties: {
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
		required: ['text', 'urls'],
	};
