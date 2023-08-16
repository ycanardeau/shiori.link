import { contactApi } from '@/api/ContactApi';
import { ContactDto } from '@/models/dto/ContactDto';
import { PaginationStore } from '@/stores/PaginationStore';
import {
	LocationStateStore,
	StateChangeEvent,
	includesAny,
} from '@aigamo/route-sphere';
import validate from 'ContactSearchLocationState.jsonschema';
import { JSONSchemaType } from 'ajv';
import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
} from 'mobx';

export interface ContactSearchLocationState {
	page?: number;
	perPage?: number;
}

export const ContactSearchLocationStateSchema: JSONSchemaType<ContactSearchLocationState> =
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

const clearResultsByQueryKeys: (keyof ContactSearchLocationState)[] = [
	'perPage',
];

export class ContactSearchStore
	implements LocationStateStore<ContactSearchLocationState>
{
	readonly paginationStore = new PaginationStore();
	@observable items: ContactDto[] = [];

	constructor() {
		makeObservable(this);
	}

	@computed.struct get locationState(): ContactSearchLocationState {
		return {
			page: this.paginationStore.page,
			perPage: this.paginationStore.perPage,
		};
	}
	set locationState(value: ContactSearchLocationState) {
		this.paginationStore.page = value.page ?? 1;
		this.paginationStore.perPage = value.perPage ?? 10;
	}

	validateLocationState(
		locationState: any,
	): locationState is ContactSearchLocationState {
		return validate(locationState);
	}

	@action.bound async updateResults(clearResults: boolean): Promise<void> {
		const result = await contactApi.list({
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
		event: StateChangeEvent<ContactSearchLocationState>,
	): Promise<void> => {
		const clearResults = includesAny(clearResultsByQueryKeys, event.keys);
		if (!event.popState && clearResults) {
			this.paginationStore.goToFirstPage();
		}

		return this.updateResults(clearResults);
	};
}
