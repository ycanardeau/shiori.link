import { Endpoint } from '@/endpoints/Endpoint';
import { Contact } from '@/entities/Contact';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toContactDto } from '@/mappers/ContactMapper';
import { ContactDto } from '@/models/dto/ContactDto';
import {
	ContactCreateRequest,
	ContactCreateRequestSchema,
} from '@/models/requests/ContactCreateRequest';
import { ContactCreateResponse } from '@/models/responses/ContactCreateResponse';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, JsonResult, Ok, Result, inject } from 'yohira';

export class ContactCreateEndpoint extends Endpoint<
	ContactCreateRequest,
	ContactCreateResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager'))
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
