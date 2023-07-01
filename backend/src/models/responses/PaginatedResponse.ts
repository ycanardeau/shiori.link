export interface PaginatedResponse<T> {
	readonly items: readonly T[];
	readonly totalCount: number;
}
