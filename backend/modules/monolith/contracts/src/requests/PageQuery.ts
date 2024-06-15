export interface PageQuery<TSort extends string | undefined = undefined> {
	sort?: TSort;
	perPage?: number;
	page?: number;
}
