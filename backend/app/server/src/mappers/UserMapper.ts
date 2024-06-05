import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UserDto } from '@shiori.link/server.monolith.contracts';
import { User } from '@shiori.link/server.monolith.domain';
import { Ok, Result } from 'yohira';

export function toUserDto(user: User): Result<UserDto, DataNotFoundError> {
	return new Ok({
		_UserDtoBrand: undefined,
		id: user.id,
		createdAt: user.createdAt.toISOString(),
		username: user.username,
		avatarUrl: user.avatarUrl,
	});
}
