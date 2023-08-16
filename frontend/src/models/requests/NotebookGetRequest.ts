import { JSONSchemaType } from 'ajv';

export interface NotebookGetRequest {
	id: number;
}

export const NotebookGetRequestSchema: JSONSchemaType<NotebookGetRequest> = {
	type: 'object',
	properties: {
		id: {
			type: 'number',
		},
	},
	required: ['id'],
};
