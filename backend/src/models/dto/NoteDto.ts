import { UserDto } from '@/models/dto/UserDto';
import { NoteType } from '@/models/enums/NoteType';

export interface NotePayloadDtoBase<T extends NoteType> {
	_NotePayloadDtoBrand: any;
	type: T;
}

export interface BookmarkNotePayloadDto
	extends NotePayloadDtoBase<NoteType.Bookmark> {
	url: string;
	title: string | undefined;
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
