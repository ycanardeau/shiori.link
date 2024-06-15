import { UserDto } from './UserDto';

export interface NotebookDto {
	_NotebookDtoBrand: any;
	id: number;
	createdAt: string;
	user: UserDto;
	name: string;
}
