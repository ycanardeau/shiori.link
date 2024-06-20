import { EntitySchema, Ref } from '@mikro-orm/core';
import {
	PasswordHashAlgorithm,
	UserLogin,
	UserUser,
} from '@shiori.link/server.user.domain';

export const UserUserSchema = new EntitySchema<UserUser>({
	class: UserUser,
	schema: 'user',
	tableName: 'users',
	properties: {
		id: {
			type: 'number',
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
			type: 'string',
		},
		passwordHashAlgorithm: {
			enum: true,
			items: (): typeof PasswordHashAlgorithm => PasswordHashAlgorithm,
		},
		salt: {
			type: 'string',
		},
		passwordHash: {
			type: 'string',
		},
		logins: {
			kind: '1:m',
			entity: (): typeof UserLogin => UserLogin,
			mappedBy: (login): Ref<UserUser> => login.user,
		},
	},
});
