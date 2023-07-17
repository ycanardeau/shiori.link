import { ContactDto } from '@/models/responses/ContactDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';

export type ContactListResponse = PaginatedResponse<ContactDto>;
