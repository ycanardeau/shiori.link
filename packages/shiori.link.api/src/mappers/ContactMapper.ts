import { Contact } from '@/entities/Contact';
import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { toUserDto } from '@/mappers/UserMapper';
import { ContactDto } from '@/models/dto/ContactDto';
import { Ok, Result } from 'yohira';

export function toContactDto(
	contact: Contact,
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
