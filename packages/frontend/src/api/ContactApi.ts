import { ContactCreateRequest } from '@/models/requests/ContactCreateRequest';
import { ContactGetRequest } from '@/models/requests/ContactGetRequest';
import { ContactListRequest } from '@/models/requests/ContactListRequest';
import { ContactCreateResponse } from '@/models/responses/ContactCreateResponse';
import { ContactGetResponse } from '@/models/responses/ContactGetResponse';
import { ContactListResponse } from '@/models/responses/ContactListResponse';
import { stringify } from 'qs';
import { Err, Ok, Result } from 'ts-results';

class ContactApi {
	async create(
		request: ContactCreateRequest,
	): Promise<Result<ContactCreateResponse, Error>> {
		try {
			const response = await fetch('/api/contact/create', {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async get(
		request: ContactGetRequest,
	): Promise<Result<ContactGetResponse, Error>> {
		try {
			const response = await fetch(
				`/api/contact/get?${stringify(request)}`,
			);
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async list(
		request: ContactListRequest,
	): Promise<Result<ContactListResponse, Error>> {
		try {
			const response = await fetch(
				`/api/contact/list?${stringify(request)}`,
			);
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}
}

export const contactApi = new ContactApi();
