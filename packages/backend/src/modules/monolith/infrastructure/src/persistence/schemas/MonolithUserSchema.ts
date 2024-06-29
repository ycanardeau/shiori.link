import { EntitySchema } from '@mikro-orm/core';
import { MonolithUser } from '@shiori.link/server.monolith.domain';

export const MonolithUserSchema = new EntitySchema<MonolithUser>({
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
		userId: {
			type: 'number',
		},
		username: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
	},
});
