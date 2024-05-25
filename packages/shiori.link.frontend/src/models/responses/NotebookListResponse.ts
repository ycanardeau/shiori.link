import { NotebookDto } from '@/models/dto/NotebookDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';

export type NotebookListResponse = PaginatedResponse<NotebookDto>;
