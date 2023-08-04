import { NoteType } from '@/models/enums/NoteType';
import { UserDto } from '@/models/responses/UserDto';

export interface NoteDto {
	_NoteDtoBrand: any;
	id: number;
	createdAt: string /* TODO: Date */;
	type: NoteType;
	user: UserDto;
	text: string;
}
