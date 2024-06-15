import { UserDto } from './UserDto';

enum NoteType {
	Bookmark = 'Bookmark',
	Markdown = 'Markdown',
}

export interface NotePayloadDtoBase<T extends NoteType> {
	_NotePayloadDtoBrand: any;
	type: T;
}

export interface BookmarkNotePayloadDto
	extends NotePayloadDtoBase<NoteType.Bookmark> {
	url: string;
	title: string;
}

export interface MarkdownNotePayloadDto
	extends NotePayloadDtoBase<NoteType.Markdown> {
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
