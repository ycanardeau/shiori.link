import { NoteDto } from '@/models/responses/NoteDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';

export type NoteListResponse = PaginatedResponse<NoteDto>;
