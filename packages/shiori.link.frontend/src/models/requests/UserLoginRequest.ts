import { JSONSchemaType } from 'ajv';

export interface UserLoginRequest {
	email: string;
	password: string;
}

export const UserLoginRequestSchema: JSONSchemaType<UserLoginRequest> = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
	},
	required: ['email', 'password'],
};
