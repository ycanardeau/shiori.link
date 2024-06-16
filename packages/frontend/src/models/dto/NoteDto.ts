import { UserDto } from '@/models/dto/UserDto';
import { NoteType } from '@/models/enums/NoteType';

export interface BookmarkNotePayloadDto {
	type: NoteType.Bookmark;
	url: string;
	title: string;
}

export interface MarkdownNotePayloadDto {
	type: NoteType.Markdown;
	text: string;
}

export type NotePayloadDto = BookmarkNotePayloadDto | MarkdownNotePayloadDto;

export interface NoteDto {
	_NoteDtoBrand: any;
	id: number;
	createdAt: string /* TODO: Date */;
	user: UserDto;
	payload: NotePayloadDto;
}
