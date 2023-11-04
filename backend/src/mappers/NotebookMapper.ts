import { Notebook } from '@/entities/Notebook';
import { NotFoundError } from '@/errors/NotFoundError';
import { toUserDto } from '@/mappers/UserMapper';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { Ok, Result } from 'yohira';

export function toNotebookDto(
	notebook: Notebook,
): Result<NotebookDto, NotFoundError> {
	const toUserDtoResult = toUserDto(notebook.user.getEntity());
	if (!toUserDtoResult.ok) {
		return toUserDtoResult;
	}

	return new Ok({
		_NotebookDtoBrand: undefined,
		id: notebook.id,
		createdAt: notebook.createdAt.toISOString(),
		user: toUserDtoResult.val,
		name: notebook.name,
	});
}
