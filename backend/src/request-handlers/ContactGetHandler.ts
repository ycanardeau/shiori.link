import { Contact } from '@/entities/Contact';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toContactDto } from '@/mappers/ContactMapper';
import {
	ContactGetRequest,
	ContactGetRequestSchema,
} from '@/models/requests/ContactGetRequest';
import { ContactGetResponse } from '@/models/responses/ContactGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class ContactGetHandler extends RequestHandler<
	ContactGetRequest,
	ContactGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(ContactGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: ContactGetRequest,
	): Promise<Result<ContactGetResponse, UnauthorizedError | NotFoundError>> {
		const currentUser = await this.currentUserService.getCurrentUser();
		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		// TODO: check permissions

		const contact = await this.em.findOne(
			Contact,
			{ id: request.id, user: currentUser /* TODO: Use global filter */ },
			{ populate: ['user'] },
		);
		if (!contact) {
			return new Err(new NotFoundError());
		}

		return toContactDto(contact);
	}
}
