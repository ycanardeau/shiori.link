import { JSONSchemaType } from 'ajv';

export interface ContactCreateRequest {
	name: string;
}

export const ContactCreateRequestSchema: JSONSchemaType<ContactCreateRequest> =
	{
		type: 'object',
		properties: {
			name: {
				type: 'string',
			},
		},
		required: ['name'],
	};
