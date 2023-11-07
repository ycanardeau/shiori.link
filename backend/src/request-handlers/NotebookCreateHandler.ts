import { Notebook } from '@/entities/Notebook';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import { NotebookDto } from '@/models/dto/NotebookDto';
import {
	NotebookCreateRequest,
	NotebookCreateRequestSchema,
} from '@/models/requests/NotebookCreateRequest';
import { NotebookCreateResponse } from '@/models/responses/NotebookCreateResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class NotebookCreateHandler extends RequestHandler<
	NotebookCreateRequest,
	NotebookCreateResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(NotebookCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NotebookCreateRequest,
	): Promise<Result<NotebookDto, UnauthorizedError | DataNotFoundError>> {
		const currentUser = await this.currentUserService.getCurrentUser(
			httpContext,
		);
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const notebook = new Notebook(currentUser, request.name);
			em.persist(notebook);

			return new Ok(notebook);
		});

		return result.andThen((notebook) => toNotebookDto(notebook));
	}
}
