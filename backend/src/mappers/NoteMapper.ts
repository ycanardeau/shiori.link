import { Note } from '@/entities/Note';
import { NotFoundError } from '@/errors/NotFoundError';
import { toUserDto } from '@/mappers/UserMapper';
import { NoteDto } from '@/models/dto/NoteDto';
import { Ok, Result } from 'yohira';

export function toNoteDto(note: Note): Result<NoteDto, NotFoundError> {
	const toUserDtoResult = toUserDto(note.user.getEntity());
	if (!toUserDtoResult.ok) {
		return toUserDtoResult;
	}

	return new Ok({
		_NoteDtoBrand: undefined,
		id: note.id,
		createdAt: note.createdAt.toISOString(),
		type: note.type,
		user: toUserDtoResult.val,
		payload: note.payload,
	});
}
