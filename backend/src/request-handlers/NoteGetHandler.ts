import { Note } from '@/entities/Note';
import { NotFoundError } from '@/errors/NotFoundError';
import { toNoteDto } from '@/mappers/NoteMapper';
import {
	NoteGetRequest,
	NoteGetRequestSchema,
} from '@/models/requests/NoteGetRequest';
import { NoteGetResponse } from '@/models/responses/NoteGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class NoteGetHandler extends RequestHandler<
	NoteGetRequest,
	NoteGetResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(NoteGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NoteGetRequest,
	): Promise<Result<NoteGetResponse, Error>> {
		// TODO: check permissions

		const note = await this.em.findOne(
			Note,
			{ id: request.id },
			{ populate: ['user'] },
		);
		if (!note) {
			return new Err(new NotFoundError());
		}

		return toNoteDto(note);
	}
}
