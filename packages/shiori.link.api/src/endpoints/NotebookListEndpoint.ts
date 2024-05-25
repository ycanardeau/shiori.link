import { Endpoint } from '@/endpoints/Endpoint';
import { Notebook } from '@/entities/Notebook';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import {
	NotebookListRequest,
	NotebookListRequestSchema,
	NotebookListSort,
} from '@/models/requests/NotebookListRequest';
import { NotebookListResponse } from '@/models/responses/NotebookListResponse';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { Err, IHttpContext, JsonResult, Ok, Result, inject } from 'yohira';

export class NotebookListEndpoint extends Endpoint<
	NotebookListRequest,
	NotebookListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager'))
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
