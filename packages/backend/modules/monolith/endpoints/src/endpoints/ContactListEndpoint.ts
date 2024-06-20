import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	ContactListRequest,
	ContactListRequestSchema,
	ContactListResponse,
	ContactListSort,
} from '@shiori.link/server.monolith.contracts';
import { MonolithContact } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toContactDto } from '../mappers/ContactMapper';
import { Endpoint } from './Endpoint';

export class ContactListEndpoint extends Endpoint<
	ContactListRequest,
	ContactListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager) private readonly em: EntityManager,
	) {
		super(ContactListRequestSchema);
	}

	private orderBy(
		sort: ContactListSort | undefined,
	): QueryOrderMap<MonolithContact> {
		switch (sort) {
			case ContactListSort.NameAsc:
			case undefined:
				return { name: 'asc' };
		}
	}

	// TODO: implement
	async handle(
		httpContext: IHttpContext,
		request: ContactListRequest,
	): Promise<
		Result<
			JsonResult<ContactListResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
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
			MonolithContact,
			{ user: currentUser /* TODO: Use global filter */ },
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		return Result.all(
			...contacts.map((contact) => toContactDto(contact)),
		).map(
			(items) =>
				new JsonResult({
					items: items,
					totalCount: totalCount,
				}),
		);
	}
}
