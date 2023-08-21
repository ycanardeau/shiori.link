import { Note } from '@/entities/Note';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteListRequest,
	NoteListRequestSchema,
	NoteListSort,
} from '@/models/requests/NoteListRequest';
import { NoteListResponse } from '@/models/responses/NoteListResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager, QueryOrderMap } from '@mikro-orm/core';
import { IHttpContext, Ok, Result, inject } from 'yohira';

export class NoteListHandler extends RequestHandler<
	NoteListRequest,
	NoteListResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
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
	): Promise<Result<NoteListResponse, Error>> {
		// TODO: check permissions

		const page =
			request.page !== undefined ? Math.max(request.page, 1) : undefined;
		const perPage =
			request.perPage !== undefined
				? Math.min(Math.max(request.perPage, 1), 100)
				: 10; /* TODO: const */

		const [notes, totalCount] = await this.em.findAndCount(
			Note,
			{
				deleted: false,
			},
			{
				orderBy: this.orderBy(request.sort),
				populate: ['user'],
				offset: page !== undefined ? (page - 1) * perPage : 0,
				limit: perPage,
			},
		);

		const toNoteDtoAllResult = Result.all(
			...notes.map((note) => toNoteDto(note)),
		);
		if (!toNoteDtoAllResult.ok) {
			return toNoteDtoAllResult;
		}

		return new Ok({
			items: toNoteDtoAllResult.val,
			totalCount: totalCount,
		});
	}
}
