import { Collection, EntitySchema } from '@mikro-orm/core';
import { Login, User } from '@shiori.link/server.user.domain';

export const LoginSchema = new EntitySchema<Login>({
	class: Login,
	schema: 'user',
	tableName: 'logins',
	properties: {
		id: {
			type: 'number',
			primary: true,
		},
		createdAt: {
			type: 'datetime',
		},
		user: {
			kind: 'm:1',
			entity: (): typeof User => User,
			inversedBy: (user): Collection<Login> => user.logins,
		},
		ip: {
			type: 'string',
		},
		success: {
			type: 'boolean',
		},
	},
});
