import { Notebook } from '@/entities/Notebook';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import {
	NotebookGetRequest,
	NotebookGetRequestSchema,
} from '@/models/requests/NotebookGetRequest';
import { NotebookGetResponse } from '@/models/responses/NotebookGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class NotebookGetHandler extends RequestHandler<
	NotebookGetRequest,
	NotebookGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(NotebookGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NotebookGetRequest,
	): Promise<Result<NotebookGetResponse, UnauthorizedError | NotFoundError>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const notebook = await this.em.findOne(
			Notebook,
			{ id: request.id, user: currentUser /* TODO: Use global filter */ },
			{ populate: ['user'] },
		);
		if (!notebook) {
			return new Err(new NotFoundError());
		}

		return toNotebookDto(notebook);
	}
}
