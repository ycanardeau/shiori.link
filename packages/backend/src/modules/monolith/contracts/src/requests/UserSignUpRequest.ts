import { JSONSchemaType } from 'ajv';

export interface UserSignUpRequest {
	email: string;
	password: string;
}

export const UserSignUpRequestSchema: JSONSchemaType<UserSignUpRequest> = {
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
