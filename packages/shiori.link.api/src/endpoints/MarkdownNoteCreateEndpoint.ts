import { Endpoint } from '@/endpoints/Endpoint';
import { NoteExternalLink } from '@/entities/ExternalLink';
import { MarkdownNote } from '@/entities/Note';
import { Notebook } from '@/entities/Notebook';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import { NoteType } from '@/models/enums/NoteType';
import {
	MarkdownNoteCreateRequest,
	MarkdownNoteCreateRequestSchema,
} from '@/models/requests/MarkdownNoteCreateRequest';
import { NoteCreateResponse } from '@/models/responses/NoteCreateResponse';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, JsonResult, Ok, Result, inject } from 'yohira';

export class MarkdownNoteCreateEndpoint extends Endpoint<
	MarkdownNoteCreateRequest,
	NoteCreateResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(MarkdownNoteCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: MarkdownNoteCreateRequest,
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

			const note = new MarkdownNote(notebook, {
				_NotePayloadDtoBrand: undefined,
				type: NoteType.Markdown,
				text: request.text,
			});
			em.persist(note);

			// TODO: validate and restrict URLs
			for (const url of request.urls) {
				const externalLink = new NoteExternalLink(note, new URL(url));
				em.persist(externalLink);
			}

			return new Ok(note);
		});

		return result
			.andThen((note) => toNoteDto(note))
			.map((noteDto) => new JsonResult(noteDto));
	}
}
