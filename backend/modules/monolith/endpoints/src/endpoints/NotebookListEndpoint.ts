import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	NotebookListRequest,
	NotebookListRequestSchema,
	NotebookListResponse,
	NotebookListSort,
} from '@shiori.link/server.monolith.contracts';
import { Notebook } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNotebookDto } from '../mappers/NotebookMapper';
import { Endpoint } from './Endpoint';

export class NotebookListEndpoint extends Endpoint<
	NotebookListRequest,
	NotebookListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager)
		private readonly em: EntityManager,
	) {
		super(NotebookListRequestSchema);
	}

	private orderBy(
		sort: NotebookListSort | undefined,
	): QueryOrderMap<Notebook> {
		switch (sort) {
			case NotebookListSort.CreatedAtDesc:
			default:
				return { createdAt: 'desc' };
		}
	}

	// TODO: implement
	async handle(
		httpContext: IHttpContext,
		request: NotebookListRequest,
	): Promise<
		Result<
			JsonResult<NotebookListResponse>,
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

		const [notebooks, totalCount] = await this.em.findAndCount(
			Notebook,
			{ user: currentUser /* TODO: Use global filter */ },
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		return Result.all(
			...notebooks.map((notebook) => toNotebookDto(notebook)),
		).map(
			(items) =>
				new JsonResult({
					items: items,
					totalCount: totalCount,
				}),
		);
	}
}
