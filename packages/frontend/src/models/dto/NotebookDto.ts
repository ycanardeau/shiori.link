import { UserDto } from '@/models/dto/UserDto';

export interface NotebookDto {
	_NotebookDtoBrand: any;
	id: number;
	createdAt: string;
	user: UserDto;
	name: string;
}
