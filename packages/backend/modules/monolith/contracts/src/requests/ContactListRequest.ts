import { JSONSchemaType } from 'ajv';

import { PageQuery } from './PageQuery';

export enum ContactListSort {
	NameAsc = 'NameAsc',
}

export type ContactListRequest = PageQuery<ContactListSort>;

export const ContactListRequestSchema: JSONSchemaType<ContactListRequest> = {
	type: 'object',
	properties: {
		sort: {
			type: 'string',
			enum: Object.values(ContactListSort),
			nullable: true,
		},
		perPage: {
			type: 'integer',
			nullable: true,
		},
		page: {
			type: 'integer',
			nullable: true,
		},
	},
};
