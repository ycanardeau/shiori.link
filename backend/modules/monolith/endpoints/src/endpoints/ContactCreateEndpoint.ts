import { EntityManager } from '@mikro-orm/core';
import { IEntityManager } from '@shiori.link/server.mikro-orm.shared';
import { ICurrentUserService } from '@shiori.link/server.monolith.application';
import {
	ContactCreateRequest,
	ContactCreateRequestSchema,
	ContactCreateResponse,
	ContactDto,
} from '@shiori.link/server.monolith.contracts';
import { Contact } from '@shiori.link/server.monolith.domain';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toContactDto } from '../mappers/ContactMapper';
import { Endpoint } from './Endpoint';

export class ContactCreateEndpoint extends Endpoint<
	ContactCreateRequest,
	ContactCreateResponse
> {
	constructor(
		@inject(IEntityManager)
		private readonly em: EntityManager,
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(ContactCreateRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: ContactCreateRequest,
	): Promise<
		Result<JsonResult<ContactDto>, UnauthorizedError | DataNotFoundError>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const contact = new Contact(currentUser, request.name);
			em.persist(contact);

			return new Ok(contact);
		});

		return result
			.andThen((contact) => toContactDto(contact))
			.map((contactDto) => new JsonResult(contactDto));
	}
}
