import { EntitySchema } from '@mikro-orm/core';
import { Contact, User } from '@shiori.link/server.monolith.domain';

export const ContactSchema = new EntitySchema<Contact>({
	class: Contact,
	// schema: 'monolith',
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
			entity: (): typeof User => User,
			ref: true,
		},
		name: {
			type: 'string',
		},
	},
});
