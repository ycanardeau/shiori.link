import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	NoteGetRequest,
	NoteGetRequestSchema,
	NoteGetResponse,
} from '@shiori.link/server.monolith.contracts';
import { Note } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNoteDto } from '../mappers/NoteMapper';
import { Endpoint } from './Endpoint';

export class NoteGetEndpoint extends Endpoint<NoteGetRequest, NoteGetResponse> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager) private readonly em: EntityManager,
	) {
		super(NoteGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NoteGetRequest,
	): Promise<
		Result<
			JsonResult<NoteGetResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
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
			return new Err(new DataNotFoundError());
		}

		return toNoteDto(note).map((noteDto) => new JsonResult(noteDto));
	}
}
