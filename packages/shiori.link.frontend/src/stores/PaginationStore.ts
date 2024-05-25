import { action, computed, makeObservable, observable } from 'mobx';

export class PaginationStore {
	@observable page = 1;
	@observable perPage = 10;
	@observable totalCount = 0;

	constructor() {
		makeObservable(this);
	}

	@computed get pageIndex(): number {
		return this.page - 1;
	}

	@computed get pageCount(): number {
		return Math.ceil(this.totalCount / this.perPage);
	}

	@action.bound setPage(value: number): void {
		this.page = value;
	}

	@action.bound setPageIndex(value: number): void {
		this.page = value + 1;
	}

	@action.bound goToFirstPage(): void {
		this.page = 1;
	}

	@action.bound setPerPage(value: number): void {
		this.perPage = value;
	}

	@action.bound setTotalCount(value: number): void {
		this.totalCount = value;
	}
}
