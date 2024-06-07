import { EntitySchema } from '@mikro-orm/core';
import { Login, User } from '@shiori.link/server.module1.domain';

export const LoginSchema = new EntitySchema<Login>({
	class: Login,
	schema: 'module1',
	tableName: 'logins',
	properties: {
		id: {
			type: 'numeric',
			primary: true,
		},
		createdAt: {
			type: 'datetime',
		},
		user: {
			kind: 'm:1',
			entity: () => User,
			inversedBy: (user) => user.logins,
		},
		ip: {
			type: 'string',
		},
		success: {
			type: 'boolean',
		},
	},
});
