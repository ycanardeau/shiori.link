import {
	NoteDto,
	NotePayloadDto,
} from '@shiori.link/server.monolith.contracts';
import { MonolithNote } from '@shiori.link/server.monolith.domain';
import { Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { toUserDto } from './UserMapper';

function getPayload(note: MonolithNote): NotePayloadDto {
	return JSON.parse(note.text);
}

export function toNoteDto(
	note: MonolithNote,
): Result<NoteDto, DataNotFoundError> {
	const userDtoResult = toUserDto(note.user.getEntity());
	if (!userDtoResult.ok) {
		return userDtoResult;
	}

	const userDto = userDtoResult.val;

	return new Ok({
		_NoteDtoBrand: undefined,
		id: note.id,
		createdAt: note.createdAt.toISOString(),
		type: note.type,
		user: userDto,
		payload: getPayload(note),
	});
}
