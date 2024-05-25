import { JSONSchemaType } from 'ajv';

export interface UserLogoutRequest {}

export const UserLogoutRequestSchema: JSONSchemaType<UserLogoutRequest> = {
	type: 'object',
};
