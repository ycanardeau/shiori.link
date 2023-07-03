import { JSONSchemaType } from 'ajv';

export interface UrlFetchRequest {
	url: string;
}

export const UrlFetchRequestSchema: JSONSchemaType<UrlFetchRequest> = {
	type: 'object',
	properties: {
		url: {
			type: 'string',
		},
	},
	required: ['url'],
};
