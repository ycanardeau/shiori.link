import { EntitySchema } from '@mikro-orm/core';
import {
	MonolithNotebook,
	MonolithUser,
} from '@shiori.link/server.monolith.domain';

export const MonolithNotebookSchema = new EntitySchema<MonolithNotebook>({
	class: MonolithNotebook,
	schema: 'monolith',
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
			entity: (): typeof MonolithUser => MonolithUser,
			ref: true,
		},
		name: {
			type: 'string',
		},
	},
});
