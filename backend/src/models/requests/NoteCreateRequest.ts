import { JSONSchemaType } from 'ajv';

export interface NoteCreateRequest {
	readonly text: string;
}

export const NoteCreateRequestSchema: JSONSchemaType<NoteCreateRequest> = {
	type: 'object',
	properties: {
		text: {
			type: 'string',
		},
	},
	required: ['text'],
};
