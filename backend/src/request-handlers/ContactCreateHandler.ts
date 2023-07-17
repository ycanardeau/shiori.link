import { Contact } from '@/entities/Contact';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toContactDto } from '@/mappers/ContactMapper';
import {
	ContactCreateRequest,
	ContactCreateRequestSchema,
} from '@/models/requests/ContactCreateRequest';
import { ContactCreateResponse } from '@/models/responses/ContactCreateResponse';
import { ContactDto } from '@/models/responses/ContactDto';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class ContactCreateHandler extends RequestHandler<
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
	): Promise<Result<ContactDto, Error>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (currentUser === undefined) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const result = await this.em.transactional(async (em) => {
			const contact = new Contact(
				currentUser,
				request.firstName,
				request.lastName,
			);
			em.persist(contact);

			return new Ok(contact);
		});

		return result.andThen((contact) => toContactDto(contact));
	}
}
