import { User } from '@/entities/User';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { UserDto } from '@/models/dto/UserDto';
import { Ok, Result } from 'yohira';

export function toUserDto(user: User): Result<UserDto, UnauthorizedError> {
	return new Ok({
		_UserDtoBrand: undefined,
		id: user.id,
		createdAt: user.createdAt.toISOString(),
		userName: user.userName,
		avatarUrl: user.avatarUrl,
	});
}
