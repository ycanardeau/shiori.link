import { createHash } from 'node:crypto';

import { UserDto } from '@shiori.link/server.user.contracts';
import { UserUser } from '@shiori.link/server.user.domain';
import { Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';

function getAvatarUrl(user: UserUser): string {
	const hash = createHash('md5')
		.update(user.email.trim().toLowerCase())
		.digest('hex');

	return `https://www.gravatar.com/avatar/${hash}`;
}

export function toUserDto(user: UserUser): Result<UserDto, DataNotFoundError> {
	return new Ok({
		_UserDtoBrand: undefined,
		id: user.id,
		createdAt: user.createdAt.toISOString(),
		username: user.username,
		avatarUrl: getAvatarUrl(user),
	});
}
