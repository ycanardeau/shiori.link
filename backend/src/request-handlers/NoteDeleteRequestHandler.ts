import { Note } from '@/entities/Note';
import { NoteDeletedNoteEvent } from '@/entities/NoteEvent';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import {
	NoteDeleteRequest,
	NoteDeleteRequestSchema,
} from '@/models/requests/NoteDeleteRequest';
import { NoteDeleteResponse } from '@/models/responses/NoteDeleteResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class NoteDeleteRequestHandler extends RequestHandler<
	NoteDeleteRequest,
	NoteDeleteResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(NoteDeleteRequestSchema);
	}

	handle(
		httpContext: IHttpContext,
		request: NoteDeleteRequest,
	): Promise<Result<NoteDeleteResponse, Error>> {
		return this.em.transactional(async (em) => {
			const currentUser = await this.currentUserService.getCurrentUser();
			if (currentUser === undefined) {
				return new Err(new UnauthorizedError());
			}

			// TODO: check permissions

			const note = await em.findOne(
				Note,
				{
					id: request.noteId,
				},
				{ populate: ['user'] },
			);

			if (!note) {
				return new Err(new NotFoundError());
			}

			if (note.user.id !== currentUser.id) {
				return new Err(new NotFoundError());
			}

			note.deleted = true;

			const event = new NoteDeletedNoteEvent(note);
			em.persist(event);

			return new Ok({});
		});
	}
}
