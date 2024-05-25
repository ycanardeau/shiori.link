import { Endpoint } from '@/endpoints/Endpoint';
import { Note } from '@/entities/Note';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteGetRequest,
	NoteGetRequestSchema,
} from '@/models/requests/NoteGetRequest';
import { NoteGetResponse } from '@/models/responses/NoteGetResponse';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, JsonResult, Result, inject } from 'yohira';

export class NoteGetEndpoint extends Endpoint<NoteGetRequest, NoteGetResponse> {
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
