import { ContactDto } from '../dtos/ContactDto';
import { PaginatedResponse } from './PaginatedResponse';

export type ContactListResponse = PaginatedResponse<ContactDto>;
