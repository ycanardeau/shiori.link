import { JSONSchemaType } from 'ajv';

export interface NoteDeleteRequest {
	noteId: number;
}

export const NoteDeleteRequestSchema: JSONSchemaType<NoteDeleteRequest> = {
	type: 'object',
	properties: {
		noteId: {
			type: 'integer',
		},
	},
	required: ['noteId'],
};
