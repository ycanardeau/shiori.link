import { JSONSchemaType } from 'ajv';

export interface ContactCreateRequest {
	firstName: string;
	lastName: string;
}

export const ContactCreateRequestSchema: JSONSchemaType<ContactCreateRequest> =
	{
		type: 'object',
		properties: {
			firstName: {
				type: 'string',
			},
			lastName: {
				type: 'string',
			},
		},
		required: ['firstName', 'lastName'],
	};
