import { EntitySchema } from '@mikro-orm/core';
import {
	MonolithContact,
	MonolithUser,
} from '@shiori.link/server.monolith.domain';

export const ContactSchema = new EntitySchema<MonolithContact>({
	class: MonolithContact,
	schema: 'monolith',
	tableName: 'contacts',
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
