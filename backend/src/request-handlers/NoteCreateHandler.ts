import { NoteExternalLink } from '@/entities/ExternalLink';
import { Note } from '@/entities/Note';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteCreateRequest,
	NoteCreateRequestSchema,
} from '@/models/requests/NoteCreateRequest';
import { NoteCreateResponse } from '@/models/responses/NoteCreateResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/mariadb';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class NoteCreateHandler extends RequestHandler<
	NoteCreateRequest,
	NoteCreateResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(NoteCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NoteCreateRequest,
	): Promise<Result<NoteCreateResponse, Error>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const parent =
				request.parentId !== undefined
					? await em.findOne(Note, { id: request.parentId })
					: undefined;

			const note = new Note(
				currentUser,
				request.text,
				parent ?? undefined,
			);
			em.persist(note);

			// TODO: validate and restrict URLs
			for (const url of request.urls) {
				const externalLink = new NoteExternalLink(note, new URL(url));
				em.persist(externalLink);
			}

			return new Ok(note);
		});

		return result.andThen((note) => toNoteDto(note));
	}
}
