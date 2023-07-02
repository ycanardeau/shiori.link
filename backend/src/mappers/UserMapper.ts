import { User } from '@/entities/User';
import { UserDto } from '@/models/responses/UserDto';
import { Ok, Result } from 'yohira';

export function toUserDto(user: User): Result<UserDto, Error> {
	return new Ok({
		_UserDtoBrand: undefined,
		id: user.id,
		createdAt: user.createdAt.toISOString(),
		userName: user.userName,
		avatarUrl: user.avatarUrl,
	});
}
