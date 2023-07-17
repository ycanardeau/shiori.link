import { ContactDto } from '@/models/dto/ContactDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';

export type ContactListResponse = PaginatedResponse<ContactDto>;
