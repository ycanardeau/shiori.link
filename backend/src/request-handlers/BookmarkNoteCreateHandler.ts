import { NoteExternalLink } from '@/entities/ExternalLink';
import { BookmarkNote } from '@/entities/Note';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	BookmarkNoteCreateRequest,
	BookmarkNoteCreateRequestSchema,
} from '@/models/requests/BookmarkNoteCreateRequest';
import { NoteCreateResponse } from '@/models/responses/NoteCreateResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/mariadb';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class BookmarkNoteCreateHandler extends RequestHandler<
	BookmarkNoteCreateRequest,
	NoteCreateResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(BookmarkNoteCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: BookmarkNoteCreateRequest,
	): Promise<Result<NoteCreateResponse, Error>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const note = new BookmarkNote(currentUser, JSON.stringify(request));
			em.persist(note);

			// TODO: validate and restrict URLs
			const externalLink = new NoteExternalLink(
				note,
				new URL(request.url),
			);
			em.persist(externalLink);

			return new Ok(note);
		});

		return result.andThen((note) => toNoteDto(note));
	}
}
