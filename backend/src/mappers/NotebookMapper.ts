import { Notebook } from '@/entities/Notebook';
import { NotFoundError } from '@/errors/NotFoundError';
import { toUserDto } from '@/mappers/UserMapper';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { Ok, Result } from 'yohira';

export function toNotebookDto(
	notebook: Notebook,
): Result<NotebookDto, NotFoundError> {
	const userDtoResult = toUserDto(notebook.user.getEntity());
	if (!userDtoResult.ok) {
		return userDtoResult;
	}

	const userDto = userDtoResult.val;

	return new Ok({
		_NotebookDtoBrand: undefined,
		id: notebook.id,
		createdAt: notebook.createdAt.toISOString(),
		user: userDto,
		name: notebook.name,
	});
}
