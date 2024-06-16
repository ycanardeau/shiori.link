import { NotebookDto } from '../dtos/NotebookDto';
import { PaginatedResponse } from './PaginatedResponse';

export type NotebookListResponse = PaginatedResponse<NotebookDto>;
