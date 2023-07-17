import { Contact } from '@/entities/Contact';
import { toContactDto } from '@/mappers/ContactMapper';
import {
	ContactListRequest,
	ContactListRequestSchema,
	ContactListSort,
} from '@/models/requests/ContactListRequest';
import { ContactListResponse } from '@/models/responses/ContactListResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IHttpContext, Ok, Result, inject } from 'yohira';

export class ContactListHandler extends RequestHandler<
	ContactListRequest,
	ContactListResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
	) {
		super(ContactListRequestSchema);
	}

	private orderBy(sort: ContactListSort | undefined): QueryOrderMap<Contact> {
		switch (sort) {
			case ContactListSort.FirstNameAsc:
			default:
				return { firstName: 'asc' };

			case ContactListSort.LastNameAsc:
				return { lastName: 'asc' };
		}
	}

	// TODO: implement
	async handle(
		httpContext: IHttpContext,
		request: ContactListRequest,
	): Promise<Result<ContactListResponse, Error>> {
		// TODO: check permissions

		const [contacts, totalCount] = await this.em.findAndCount(
			Contact,
			{},
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
			},
		);

		const toContactDtoAllResult = Result.all(
			...contacts.map((contact) => toContactDto(contact)),
		);
		if (!toContactDtoAllResult.ok) {
			return toContactDtoAllResult;
		}

		return new Ok({
			items: toContactDtoAllResult.val,
			totalCount: totalCount,
		});
	}
}
