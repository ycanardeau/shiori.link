import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	NotebookCreateRequest,
	NotebookCreateRequestSchema,
	NotebookCreateResponse,
	NotebookDto,
} from '@shiori.link/server.monolith.contracts';
import { MonolithNotebook } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNotebookDto } from '../mappers/NotebookMapper';
import { Endpoint } from './Endpoint';

export class NotebookCreateEndpoint extends Endpoint<
	NotebookCreateRequest,
	NotebookCreateResponse
> {
	constructor(
		@inject(IEntityManager)
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(NotebookCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NotebookCreateRequest,
	): Promise<
		Result<JsonResult<NotebookDto>, UnauthorizedError | DataNotFoundError>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const notebook = new MonolithNotebook(currentUser, request.name);
			em.persist(notebook);

			return new Ok(notebook);
		});

		return result
			.andThen((notebook) => toNotebookDto(notebook))
			.map((notebookDto) => new JsonResult(notebookDto));
	}
}
