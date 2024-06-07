import { JSONSchemaType } from 'ajv';

export interface UserSignUpRequest {
	username: string;
	email: string;
	password: string;
}

export const UserSignUpRequestSchema: JSONSchemaType<UserSignUpRequest> = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
	},
	required: ['username', 'email', 'password'],
};
