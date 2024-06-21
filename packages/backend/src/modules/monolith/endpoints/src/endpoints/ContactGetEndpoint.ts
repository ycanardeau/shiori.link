import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	ContactGetRequest,
	ContactGetRequestSchema,
	ContactGetResponse,
} from '@shiori.link/server.monolith.contracts';
import { MonolithContact } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toContactDto } from '../mappers/ContactMapper';
import { Endpoint } from './Endpoint';

export class ContactGetEndpoint extends Endpoint<
	ContactGetRequest,
	ContactGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(IEntityManager) private readonly em: EntityManager,
	) {
		super(ContactGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: ContactGetRequest,
	): Promise<
		Result<
			JsonResult<ContactGetResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const contact = await this.em.findOne(
			MonolithContact,
			{ id: request.id, user: currentUser /* TODO: Use global filter */ },
			{ populate: ['user'] },
		);
		if (!contact) {
			return new Err(new DataNotFoundError());
		}

		return toContactDto(contact).map(
			(contactDto) => new JsonResult(contactDto),
		);
	}
}
