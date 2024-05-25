import { Endpoint } from '@/endpoints/Endpoint';
import { Notebook } from '@/entities/Notebook';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toNotebookDto } from '@/mappers/NotebookMapper';
import {
	NotebookGetRequest,
	NotebookGetRequestSchema,
} from '@/models/requests/NotebookGetRequest';
import { NotebookGetResponse } from '@/models/responses/NotebookGetResponse';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, JsonResult, Result, inject } from 'yohira';

export class NotebookGetEndpoint extends Endpoint<
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
			Notebook,
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
