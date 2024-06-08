import { EntitySchema } from '@mikro-orm/core';
import {
	Login,
	PasswordHashAlgorithm,
	User,
} from '@shiori.link/server.user.domain';

export const UserSchema = new EntitySchema<User>({
	class: User,
	schema: 'user',
	tableName: 'users',
	properties: {
		id: {
			type: 'numeric',
			primary: true,
		},
		createdAt: {
			type: 'datetime',
		},
		username: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
		normalizedEmail: {
			type: 'normalizedEmail',
		},
		passwordHashAlgorithm: {
			enum: true,
			items: () => PasswordHashAlgorithm,
		},
		salt: {
			type: 'string',
		},
		passwordHash: {
			type: 'string',
		},
		logins: {
			kind: '1:m',
			entity: () => Login,
			mappedBy: (login) => login.user,
		},
	},
});
