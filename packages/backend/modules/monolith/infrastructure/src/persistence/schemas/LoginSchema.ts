import { Collection, EntitySchema } from '@mikro-orm/core';
import { Login, User } from '@shiori.link/server.monolith.domain';

export const LoginSchema = new EntitySchema<Login>({
	class: Login,
	// schema: 'monolith',
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
			ref: true,
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
