import { JSONSchemaType } from 'ajv';

export interface NoteCreateRequest {
	text: string;
	urls: string[];
	parentId: number | undefined;
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
		parentId: {
			type: 'number',
			nullable: true,
		},
	},
	required: ['text', 'urls'],
};
