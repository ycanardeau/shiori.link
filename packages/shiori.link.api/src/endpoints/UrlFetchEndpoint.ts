import { Endpoint } from '@/endpoints/Endpoint';
import {
	UrlFetchRequest,
	UrlFetchRequestSchema,
} from '@/models/requests/UrlFetchRequest';
import { UrlFetchResponse } from '@/models/responses/UrlFetchResponse';
import { JSDOM } from 'jsdom';
import { Err, IHttpContext, JsonResult, Ok, Result } from 'yohira';

export class UrlFetchEndpoint extends Endpoint<
	UrlFetchRequest,
	UrlFetchResponse
> {
	constructor() {
		super(UrlFetchRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UrlFetchRequest,
	): Promise<Result<JsonResult<UrlFetchResponse>, Error>> {
		try {
			const response = await fetch(request.url);
			const text = await response.text();
			const dom = new JSDOM(text);
			return new Ok(
				new JsonResult({
					title:
						dom.window.document
							.querySelector('title')
							?.textContent?.trim() ?? undefined,
					canonical:
						dom.window.document
							.querySelector("link[rel='canonical']")
							?.getAttribute('href') ?? undefined,
				}),
			);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}
}
