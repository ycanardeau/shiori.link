import { UserDto } from '@shiori.link/server.module1.contracts';
import { User } from '@shiori.link/server.module1.domain';
import { Ok, Result } from '@yohira/app';
import { createHash } from 'node:crypto';

import { DataNotFoundError } from '../errors/DataNotFoundError';

function getAvatarUrl(email: string): string {
	const hash = createHash('md5')
		.update(email.trim().toLowerCase())
		.digest('hex');

	return `https://www.gravatar.com/avatar/${hash}`;
}

export function toUserDto(user: User): Result<UserDto, DataNotFoundError> {
	return new Ok({
		_UserDtoBrand: undefined,
		id: user.id,
		createdAt: user.createdAt.toISOString(),
		username: user.username,
		avatarUrl: getAvatarUrl(user.email),
	});
}
