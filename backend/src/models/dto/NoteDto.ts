import { UserDto } from '@/models/dto/UserDto';
import { NoteType } from '@/models/enums/NoteType';

export interface NoteDataDtoBase<T extends NoteType> {
	_NoteDataDtoBrand: any;
	type: T;
}

export interface BookmarkNoteDataDto
	extends NoteDataDtoBase<NoteType.Bookmark> {
	url: string;
	title: string | undefined;
}

export interface MarkdownNoteDataDto
	extends NoteDataDtoBase<NoteType.Markdown> {
	text: string;
}

export type NoteDataDto = BookmarkNoteDataDto | MarkdownNoteDataDto;

export interface NoteDto {
	_NoteDtoBrand: any;
	id: number;
	createdAt: string /* TODO: Date */;
	user: UserDto;
	data: NoteDataDto;
}
