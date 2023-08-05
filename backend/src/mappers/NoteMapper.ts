import { Note } from '@/entities/Note';
import { toUserDto } from '@/mappers/UserMapper';
import { NoteDataDto, NoteDto } from '@/models/dto/NoteDto';
import { Ok, Result } from 'yohira';

export function toNoteDto(note: Note): Result<NoteDto, Error> {
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
		data: {
			...note.data,
			type: note.type,
		} as NoteDataDto,
	});
}
