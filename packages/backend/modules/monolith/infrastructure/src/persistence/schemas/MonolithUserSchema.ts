import { EntitySchema, Ref } from '@mikro-orm/core';
import {
	MonolithLogin,
	MonolithUser,
	PasswordHashAlgorithm,
} from '@shiori.link/server.monolith.domain';

export const UserSchema = new EntitySchema<MonolithUser>({
	class: MonolithUser,
	schema: 'monolith',
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
			entity: (): typeof MonolithLogin => MonolithLogin,
			mappedBy: (login): Ref<MonolithUser> => login.user,
		},
	},
});
