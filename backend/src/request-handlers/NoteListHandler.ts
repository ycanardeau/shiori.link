import { Note } from '@/entities/Note';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteListRequest,
	NoteListRequestSchema,
	NoteListSort,
} from '@/models/requests/NoteListRequest';
import { NoteListResponse } from '@/models/responses/NoteListResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class NoteListHandler extends RequestHandler<
	NoteListRequest,
	NoteListResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(NoteListRequestSchema);
	}

	private orderBy(sort: NoteListSort | undefined): QueryOrderMap<Note<any>> {
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
		Result<NoteListResponse, UnauthorizedError | DataNotFoundError>
	> {
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

		const [notes, totalCount] = await this.em.findAndCount(
			Note,
			{ user: currentUser /* TODO: Use global filter */ },
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		return Result.all(...notes.map((note) => toNoteDto(note))).andThen(
			(items) =>
				new Ok({
					items: items,
					totalCount: totalCount,
				}),
		);
	}
}
