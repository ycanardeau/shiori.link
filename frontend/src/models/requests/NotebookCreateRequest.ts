import { JSONSchemaType } from 'ajv';

export interface NotebookCreateRequest {
	name: string;
}

export const NotebookCreateRequestSchema: JSONSchemaType<NotebookCreateRequest> =
	{
		type: 'object',
		properties: {
			name: {
				type: 'string',
			},
		},
		required: ['name'],
	};
