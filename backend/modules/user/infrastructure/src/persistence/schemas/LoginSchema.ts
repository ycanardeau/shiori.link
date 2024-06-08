import { EntitySchema } from '@mikro-orm/core';
import { Login, User } from '@shiori.link/server.user.domain';

export const LoginSchema = new EntitySchema<Login>({
	class: Login,
	schema: 'user',
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
