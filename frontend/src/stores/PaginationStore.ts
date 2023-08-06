import { action, makeObservable, observable } from 'mobx';

export class PaginationStore {
	@observable page = 1;
	@observable perPage = 10;

	constructor() {
		makeObservable(this);
	}

	@action setPage(value: number): void {
		this.page = value;
	}

	@action setPerPage(value: number): void {
		this.perPage = value;
	}
}
