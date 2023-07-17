import { Contact } from '@/entities/Contact';
import { toUserDto } from '@/mappers/UserMapper';
import { ContactDto } from '@/models/responses/ContactDto';
import { Ok, Result } from 'yohira';

export function toContactDto(contact: Contact): Result<ContactDto, Error> {
	const toUserDtoResult = toUserDto(contact.user.getEntity());
	if (!toUserDtoResult.ok) {
		return toUserDtoResult;
	}

	return new Ok({
		_ContactDtoBrand: undefined,
		id: contact.id,
		createdAt: contact.createdAt.toISOString(),
		user: toUserDtoResult.val,
		firstName: contact.firstName,
		lastName: contact.lastName,
	});
}
