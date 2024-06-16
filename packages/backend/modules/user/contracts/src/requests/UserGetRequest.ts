import { JSONSchemaType } from 'ajv';

export interface UserGetRequest {}

export const UserGetRequestSchema: JSONSchemaType<UserGetRequest> = {
	type: 'object',
	properties: {},
};
