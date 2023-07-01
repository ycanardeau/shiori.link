import { Note } from '@/entities/Note';
import { toUserDto } from '@/mappers/UserMapper';
import { NoteDto } from '@/models/responses/NoteDto';
import { Ok, Result } from 'yohira';

export function toNoteDto(note: Note): Result<NoteDto, Error> {
	const toUserDtoResult = toUserDto(note.user.getEntity());
	if (!toUserDtoResult.ok) {
		return toUserDtoResult;
	}

	return new Ok({
		_NoteDtoBrand: undefined,
		id: note.id,
		createdAt: note.createdAt,
		user: toUserDtoResult.val,
		text: note.text,
	});
}
