import { EntitySchema } from '@mikro-orm/core';
import { Notebook, User } from '@shiori.link/server.monolith.domain';

export const NotebookSchema = new EntitySchema<Notebook>({
	class: Notebook,
	// schema: 'monolith',
	tableName: 'notebooks',
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
		},
		name: {
			type: 'string',
		},
	},
});
