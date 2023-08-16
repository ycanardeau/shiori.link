import { notebookApi } from '@/api/NotebookApi';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { PaginationStore } from '@/stores/PaginationStore';
import {
	LocationStateStore,
	StateChangeEvent,
	includesAny,
} from '@aigamo/route-sphere';
import validate from 'NotebookSearchLocationState.jsonschema';
import { JSONSchemaType } from 'ajv';
import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
} from 'mobx';

export interface NotebookSearchLocationState {
	page?: number;
	perPage?: number;
}

export const NotebookSearchLocationStateSchema: JSONSchemaType<NotebookSearchLocationState> =
	{
		type: 'object',
		properties: {
			page: {
				type: 'integer',
				nullable: true,
			},
			perPage: {
				type: 'integer',
				nullable: true,
			},
		},
	};

const clearResultsByQueryKeys: (keyof NotebookSearchLocationState)[] = [
	'perPage',
];

export class NotebookSearchStore
	implements LocationStateStore<NotebookSearchLocationState>
{
	readonly paginationStore = new PaginationStore();
	@observable items: NotebookDto[] = [];
	@observable loading = false;

	constructor() {
		makeObservable(this);
	}

	@computed.struct get locationState(): NotebookSearchLocationState {
		return {
			page: this.paginationStore.page,
			perPage: this.paginationStore.perPage,
		};
	}
	set locationState(value: NotebookSearchLocationState) {
		this.paginationStore.page = value.page ?? 1;
		this.paginationStore.perPage = value.perPage ?? 10;
	}

	validateLocationState(
		locationState: any,
	): locationState is NotebookSearchLocationState {
		return validate(locationState);
	}

	@action.bound async updateResults(clearResults: boolean): Promise<void> {
		this.loading = true;

		const result = await notebookApi.list({
			page: this.paginationStore.page,
			perPage: this.paginationStore.perPage,
		});

		if (result.ok) {
			runInAction(() => {
				this.items = result.val.items;

				this.paginationStore.setTotalCount(result.val.totalCount);
			});
		}

		runInAction(() => {
			this.loading = false;
		});
	}

	onLocationStateChange = (
		event: StateChangeEvent<NotebookSearchLocationState>,
	): Promise<void> => {
		const clearResults = includesAny(clearResultsByQueryKeys, event.keys);
		if (!event.popState && clearResults) {
			this.paginationStore.goToFirstPage();
		}

		return this.updateResults(clearResults);
	};
}
