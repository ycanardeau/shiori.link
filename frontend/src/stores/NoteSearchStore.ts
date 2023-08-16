import { noteApi } from '@/api/NoteApi';
import { NoteDto } from '@/models/dto/NoteDto';
import { PaginationStore } from '@/stores/PaginationStore';
import {
	LocationStateStore,
	StateChangeEvent,
	includesAny,
} from '@aigamo/route-sphere';
import validate from 'NoteSearchLocationState.jsonschema';
import { JSONSchemaType } from 'ajv';
import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
} from 'mobx';

export interface NoteSearchLocationState {
	page?: number;
	perPage?: number;
}

export const NoteSearchLocationStateSchema: JSONSchemaType<NoteSearchLocationState> =
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

const clearResultsByQueryKeys: (keyof NoteSearchLocationState)[] = ['perPage'];

export class NoteSearchStore
	implements LocationStateStore<NoteSearchLocationState>
{
	readonly paginationStore = new PaginationStore();
	@observable items: NoteDto[] = [];

	constructor() {
		makeObservable(this);
	}

	@computed.struct get locationState(): NoteSearchLocationState {
		return {
			page: this.paginationStore.page,
			perPage: this.paginationStore.perPage,
		};
	}
	set locationState(value: NoteSearchLocationState) {
		this.paginationStore.page = value.page ?? 1;
		this.paginationStore.perPage = value.perPage ?? 10;
	}

	validateLocationState(
		locationState: any,
	): locationState is NoteSearchLocationState {
		return validate(locationState);
	}

	@action.bound async updateResults(clearResults: boolean): Promise<void> {
		const result = await noteApi.list({
			page: this.paginationStore.page,
			perPage: this.paginationStore.perPage,
		});

		if (result.ok) {
			runInAction(() => {
				this.items = result.val.items;

				this.paginationStore.setTotalCount(result.val.totalCount);
			});
		}
	}

	onLocationStateChange = (
		event: StateChangeEvent<NoteSearchLocationState>,
	): Promise<void> => {
		const clearResults = includesAny(clearResultsByQueryKeys, event.keys);
		if (!event.popState && clearResults) {
			this.paginationStore.goToFirstPage();
		}

		return this.updateResults(clearResults);
	};
}
