import { NoteDto } from '@/models/dto/NoteDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';

export type NoteListResponse = PaginatedResponse<NoteDto>;
