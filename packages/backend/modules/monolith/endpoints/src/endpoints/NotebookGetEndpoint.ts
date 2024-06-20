import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	NotebookGetRequest,
	NotebookGetRequestSchema,
	NotebookGetResponse,
} from '@shiori.link/server.monolith.contracts';
import { MonolithNotebook } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toNotebookDto } from '../mappers/NotebookMapper';
import { Endpoint } from './Endpoint';

export class NotebookGetEndpoint extends Endpoint<
	NotebookGetRequest,
	NotebookGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager) private readonly em: EntityManager,
	) {
		super(NotebookGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: NotebookGetRequest,
	): Promise<
		Result<
			JsonResult<NotebookGetResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const notebook = await this.em.findOne(
			MonolithNotebook,
			{ id: request.id, user: currentUser /* TODO: Use global filter */ },
			{ populate: ['user'] },
		);
		if (!notebook) {
			return new Err(new DataNotFoundError());
		}

		return toNotebookDto(notebook).map(
			(notebookDto) => new JsonResult(notebookDto),
		);
	}
}
