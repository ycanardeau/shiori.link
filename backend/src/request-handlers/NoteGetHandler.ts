import { Note } from '@/entities/Note';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteGetRequest,
	NoteGetRequestSchema,
} from '@/models/requests/NoteGetRequest';
import { NoteGetResponse } from '@/models/responses/NoteGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class NoteGetHandler extends RequestHandler<
	NoteGetRequest,
	NoteGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(NoteGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NoteGetRequest,
	): Promise<Result<NoteGetResponse, UnauthorizedError | NotFoundError>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const note = await this.em.findOne(
			Note,
			{ id: request.id, user: currentUser /* TODO: Use global filter */ },
			{ populate: ['user'] },
		);
		if (!note) {
			return new Err(new NotFoundError());
		}

		return toNoteDto(note);
	}
}
