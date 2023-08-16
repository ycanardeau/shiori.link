import { NotebookCreateRequest } from '@/models/requests/NotebookCreateRequest';
import { NotebookGetRequest } from '@/models/requests/NotebookGetRequest';
import { NotebookListRequest } from '@/models/requests/NotebookListRequest';
import { NotebookCreateResponse } from '@/models/responses/NotebookCreateResponse';
import { NotebookGetResponse } from '@/models/responses/NotebookGetResponse';
import { NotebookListResponse } from '@/models/responses/NotebookListResponse';
import { stringify } from 'qs';
import { Err, Ok, Result } from 'ts-results';

class NotebookApi {
	async create(
		request: NotebookCreateRequest,
	): Promise<Result<NotebookCreateResponse, Error>> {
		try {
			const response = await fetch('/api/notebook/create', {
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
		request: NotebookGetRequest,
	): Promise<Result<NotebookGetResponse, Error>> {
		try {
			const response = await fetch(
				`/api/notebook/get?${stringify(request)}`,
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
		request: NotebookListRequest,
	): Promise<Result<NotebookListResponse, Error>> {
		try {
			const response = await fetch(
				`/api/notebook/list?${stringify(request)}`,
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

export const notebookApi = new NotebookApi();
