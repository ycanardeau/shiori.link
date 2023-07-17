import { UserDto } from '@/models/responses/UserDto';

export interface ContactDto {
	_ContactDtoBrand: any;
	id: number;
	createdAt: string;
	user: UserDto;
	firstName: string;
	lastName: string;
}
