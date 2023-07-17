import { Contact } from '@/entities/Contact';
import { NotFoundError } from '@/errors/NotFoundError';
import { toContactDto } from '@/mappers/ContactMapper';
import {
	ContactGetRequest,
	ContactGetRequestSchema,
} from '@/models/requests/ContactGetRequest';
import { ContactGetResponse } from '@/models/responses/ContactGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { EntityManager } from '@mikro-orm/core';
import { Err, IHttpContext, Result, inject } from 'yohira';

export class ContactGetHandler extends RequestHandler<
	ContactGetRequest,
	ContactGetResponse
> {
	constructor(
		@inject(Symbol.for('EntityManager')) private readonly em: EntityManager,
	) {
		super(ContactGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: ContactGetRequest,
	): Promise<Result<ContactGetResponse, Error>> {
		// TODO: check permissions

		const contact = await this.em.findOne(
			Contact,
			{ id: request.id },
			{ populate: ['user'] },
		);
		if (!contact) {
			return new Err(new NotFoundError());
		}

		return toContactDto(contact);
	}
}
