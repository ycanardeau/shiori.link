import { Notebook } from '@/entities/Notebook';
import { NotFoundError } from '@/errors/NotFoundError';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import {
	NotebookGetRequest,
	NotebookGetRequestSchema,
} from '@/models/requests/NotebookGetRequest';
import { NotebookGetResponse } from '@/models/responses/NotebookGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class NotebookGetHandler extends RequestHandler<
	NotebookGetRequest,
	NotebookGetResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(NotebookGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NotebookGetRequest,
	): Promise<Result<NotebookGetResponse, Error>> {
		// TODO: check permissions

		const notebook = await this.em.findOne(
			Notebook,
			{ id: request.id },
			{ populate: ['user'] },
		);
		if (!notebook) {
			return new Err(new NotFoundError());
		}

		return toNotebookDto(notebook);
	}
}
