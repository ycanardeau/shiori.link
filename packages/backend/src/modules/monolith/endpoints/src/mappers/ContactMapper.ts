import { ContactDto } from '@shiori.link/server.monolith.contracts';
import { MonolithContact } from '@shiori.link/server.monolith.domain';
import { Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { toUserDto } from './UserMapper';

export function toContactDto(
	contact: MonolithContact,
): Result<ContactDto, DataNotFoundError> {
	const userDtoResult = toUserDto(contact.user.getEntity());
	if (!userDtoResult.ok) {
		return userDtoResult;
	}

	const userDto = userDtoResult.val;

	return new Ok({
		_ContactDtoBrand: undefined,
		id: contact.id,
		createdAt: contact.createdAt.toISOString(),
		user: userDto,
		name: contact.name,
	});
}
