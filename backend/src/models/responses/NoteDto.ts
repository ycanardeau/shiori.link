import { UserDto } from '@/models/responses/UserDto';

export interface NoteDto {
	_NoteDtoBrand: any;
	id: number;
	createdAt: Date;
	user: UserDto;
	text: string;
}
