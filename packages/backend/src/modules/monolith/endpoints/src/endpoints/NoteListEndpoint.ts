import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	NoteListRequest,
	NoteListRequestSchema,
	NoteListResponse,
	NoteListSort,
} from '@shiori.link/server.monolith.contracts';
import { MonolithNote } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNoteDto } from '../mappers/NoteMapper';
import { Endpoint } from './Endpoint';

export class NoteListEndpoint extends Endpoint<
	NoteListRequest,
	NoteListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager) private readonly em: EntityManager,
	) {
		super(NoteListRequestSchema);
	}

	private orderBy(
		sort: NoteListSort | undefined,
	): QueryOrderMap<MonolithNote<any>> {
		switch (sort) {
			case NoteListSort.CreatedAtAsc:
				return { createdAt: 'asc' };

			case NoteListSort.CreatedAtDesc:
			default:
				return { createdAt: 'desc' };
		}
	}

	// TODO: implement
	async handle(
		httpContext: IHttpContext,
		request: NoteListRequest,
	): Promise<
		Result<
			JsonResult<NoteListResponse>,
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

		const [notes, totalCount] = await this.em.findAndCount(
			MonolithNote,
			{ user: currentUser /* TODO: Use global filter */ },
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		return Result.all(...notes.map((note) => toNoteDto(note))).map(
			(items) =>
				new JsonResult({
					items: items,
					totalCount: totalCount,
				}),
		);
	}
}
