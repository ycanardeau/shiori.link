import { Notebook } from '@/entities/Notebook';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import {
	NotebookListRequest,
	NotebookListRequestSchema,
	NotebookListSort,
} from '@/models/requests/NotebookListRequest';
import { NotebookListResponse } from '@/models/responses/NotebookListResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IHttpContext, Ok, Result, inject } from 'yohira';

export class NotebookListHandler extends RequestHandler<
	NotebookListRequest,
	NotebookListResponse
> {
	constructor(
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
	): Promise<Result<NotebookListResponse, Error>> {
		// TODO: check permissions

		const page =
			request.page !== undefined ? Math.max(request.page, 1) : undefined;
		const perPage =
			request.perPage !== undefined
				? Math.min(Math.max(request.perPage, 1), 100)
				: 10; /* TODO: const */

		const [notebooks, totalCount] = await this.em.findAndCount(
			Notebook,
			{},
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		const toNotebookDtoAllResult = Result.all(
			...notebooks.map((notebook) => toNotebookDto(notebook)),
		);
		if (!toNotebookDtoAllResult.ok) {
			return toNotebookDtoAllResult;
		}

		return new Ok({
			items: toNotebookDtoAllResult.val,
			totalCount: totalCount,
		});
	}
}