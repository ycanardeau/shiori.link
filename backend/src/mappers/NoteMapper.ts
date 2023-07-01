import { Note } from '@/entities/Note';
import { toUserDto } from '@/mappers/UserMapper';
import { NoteDto } from '@/models/responses/NoteDto';
import { Err, Ok, Result } from 'yohira';

export function toNoteDto(note: Note): Result<NoteDto, Error> {
	const toUserDtoResult = toUserDto(note.user.getEntity());
	if (!toUserDtoResult.ok) {
		return new Err(toUserDtoResult.val);
	}

	return new Ok({
		_NoteDtoBrand: undefined,
		id: note.id,
		createdAt: note.createdAt,
		user: toUserDtoResult.val,
		text: note.text,
	});
}
