import { UserDto } from '@/models/dto/UserDto';
import { NoteType } from '@/models/enums/NoteType';

export interface BookmarkNoteDataDto {
	type: NoteType.Bookmark;
	url: string;
	title: string | undefined;
}

export interface MarkdownNoteDataDto {
	type: NoteType.Markdown;
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
