import { UserDto } from '@/models/dto/UserDto';

export interface ContactDto {
	_ContactDtoBrand: any;
	id: number;
	createdAt: string;
	user: UserDto;
	name: string;
}
