import { JSONSchemaType } from 'ajv';

export interface UserLoginRequest {
	username: string;
	password: string;
}

export const UserLoginRequestSchema: JSONSchemaType<UserLoginRequest> = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
	},
	required: ['username', 'password'],
};
