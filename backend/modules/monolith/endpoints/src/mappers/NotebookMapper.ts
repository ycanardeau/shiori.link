import { NotebookDto } from '@shiori.link/server.monolith.contracts';
import { Notebook } from '@shiori.link/server.monolith.domain';
import { Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { toUserDto } from './UserMapper';

export function toNotebookDto(
	notebook: Notebook,
): Result<NotebookDto, DataNotFoundError> {
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
