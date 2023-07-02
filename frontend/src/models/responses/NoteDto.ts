import { UserDto } from '@/models/responses/UserDto';

export interface NoteDto {
	_NoteDtoBrand: any;
	id: number;
	createdAt: string /* TODO: Date */;
	user: UserDto;
	text: string;
}
