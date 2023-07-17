import { PageQuery } from '@/models/requests/PageQuery';
import { JSONSchemaType } from 'ajv';

export enum ContactListSort {
	FirstNameAsc = 'FirstNameAsc',
	LastNameAsc = 'LastNameAsc',
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
