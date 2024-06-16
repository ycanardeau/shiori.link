import {
	NoteDto,
	NotePayloadDto,
} from '@shiori.link/server.monolith.contracts';
import { Note } from '@shiori.link/server.monolith.domain';
import { Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { toUserDto } from './UserMapper';

function getPayload(note: Note): NotePayloadDto {
	return JSON.parse(note.text);
}

export function toNoteDto(note: Note): Result<NoteDto, DataNotFoundError> {
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
