import { NoteDto } from '../dtos/NoteDto';
import { PaginatedResponse } from './PaginatedResponse';

export type NoteListResponse = PaginatedResponse<NoteDto>;
