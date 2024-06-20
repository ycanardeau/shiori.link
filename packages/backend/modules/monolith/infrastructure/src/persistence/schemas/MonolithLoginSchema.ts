import { Collection, EntitySchema } from '@mikro-orm/core';
import {
	MonolithLogin,
	MonolithUser,
} from '@shiori.link/server.monolith.domain';

export const LoginSchema = new EntitySchema<MonolithLogin>({
	class: MonolithLogin,
	schema: 'monolith',
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
			entity: (): typeof MonolithUser => MonolithUser,
			ref: true,
			inversedBy: (user): Collection<MonolithLogin> => user.logins,
		},
		ip: {
			type: 'string',
		},
		success: {
			type: 'boolean',
		},
	},
});
