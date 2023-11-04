import { Contact } from '@/entities/Contact';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toContactDto } from '@/mappers/ContactMapper';
import {
	ContactListRequest,
	ContactListRequestSchema,
	ContactListSort,
} from '@/models/requests/ContactListRequest';
import { ContactListResponse } from '@/models/responses/ContactListResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class ContactListHandler extends RequestHandler<
	ContactListRequest,
	ContactListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
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
	): Promise<Result<ContactListResponse, UnauthorizedError | NotFoundError>> {
		const currentUser = await this.currentUserService.getCurrentUser(
			httpContext,
		);
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const page =
			request.page !== undefined ? Math.max(request.page, 1) : undefined;
		const perPage =
			request.perPage !== undefined
				? Math.min(Math.max(request.perPage, 1), 100)
				: 10; /* TODO: const */

		const [contacts, totalCount] = await this.em.findAndCount(
			Contact,
			{ user: currentUser /* TODO: Use global filter */ },
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
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
