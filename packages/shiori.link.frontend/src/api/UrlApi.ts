import { UrlFetchRequest } from '@/models/requests/UrlFetchRequest';
import { UrlFetchResponse } from '@/models/responses/UrlFetchResponse';
import { Err, Ok, Result } from 'ts-results';

class UrlApi {
	async fetch(
		request: UrlFetchRequest,
	): Promise<Result<UrlFetchResponse, Error>> {
		try {
			const response = await fetch('/api/url/fetch', {
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
}

export const urlApi = new UrlApi();
