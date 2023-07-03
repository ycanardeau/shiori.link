import { JSONSchemaType } from 'ajv';

export interface NoteCreateRequest {
	text: string;
	urls: string[];
}

export const NoteCreateRequestSchema: JSONSchemaType<NoteCreateRequest> = {
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
