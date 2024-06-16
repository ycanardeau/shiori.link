import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	BookmarkNoteCreateRequest,
	BookmarkNoteCreateRequestSchema,
	NoteCreateResponse,
} from '@shiori.link/server.monolith.contracts';
import {
	BookmarkNote,
	Notebook,
	NoteExternalLink,
	NoteType,
} from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNoteDto } from '../mappers/NoteMapper';
import { Endpoint } from './Endpoint';

export class BookmarkNoteCreateEndpoint extends Endpoint<
	BookmarkNoteCreateRequest,
	NoteCreateResponse
> {
	constructor(
		@inject(IEntityManager)
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(BookmarkNoteCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: BookmarkNoteCreateRequest,
	): Promise<
		Result<
			JsonResult<NoteCreateResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			// TODO: remove
			const notebooks = await em.find(Notebook, {});
			if (notebooks.length === 0) {
				return new Err(new DataNotFoundError());
			}
			const notebook = notebooks[0];

			const note = new BookmarkNote(notebook, {
				_NotePayloadBrand: undefined,
				type: NoteType.Bookmark,
				url: request.url,
				title: request.title,
			});
			em.persist(note);

			// TODO: validate and restrict URLs
			const externalLink = new NoteExternalLink(
				note,
				new URL(request.url),
			);
			em.persist(externalLink);

			return new Ok(note);
		});

		return result
			.andThen((note) => toNoteDto(note))
			.map((noteDto) => new JsonResult(noteDto));
	}
}
