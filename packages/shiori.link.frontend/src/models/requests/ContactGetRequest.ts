import { JSONSchemaType } from 'ajv';

export interface ContactGetRequest {
	id: number;
}

export const ContactGetRequestSchema: JSONSchemaType<ContactGetRequest> = {
	type: 'object',
	properties: {
		id: {
			type: 'number',
		},
	},
	required: ['id'],
};
