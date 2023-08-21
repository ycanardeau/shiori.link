import { Note } from '@/entities/Note';
import { NotFoundError } from '@/errors/NotFoundError';
import { toUserDto } from '@/mappers/UserMapper';
import { NoteDto } from '@/models/dto/NoteDto';
import { Err, Ok, Result } from 'yohira';

export function toNoteDto(note: Note): Result<NoteDto, Error> {
	const toUserDtoResult = toUserDto(note.user.getEntity());
	if (!toUserDtoResult.ok) {
		return toUserDtoResult;
	}

	if (note.deleted) {
		return new Err(new NotFoundError());
	}

	return new Ok({
		_NoteDtoBrand: undefined,
		id: note.id,
		createdAt: note.createdAt.toISOString(),
		type: note.type,
		user: toUserDtoResult.val,
		data: note.data,
	});
}
