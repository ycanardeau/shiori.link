import { JSONSchemaType } from 'ajv';

export interface NoteGetRequest {
	id: number;
}

export const NoteGetRequestSchema: JSONSchemaType<NoteGetRequest> = {
	type: 'object',
	properties: {
		id: {
			type: 'integer',
		},
	},
	required: ['id'],
};
