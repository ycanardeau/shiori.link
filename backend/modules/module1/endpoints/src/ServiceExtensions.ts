import {
	ActionContext,
	IEndpointRouteBuilder,
	IHttpContext,
	IServiceCollection,
	StatusCodes,
	addTransientCtor,
	getRequiredService,
	mapGet,
	mapPost,
	write,
} from '@yohira/app';

import { Endpoint } from './endpoints/Endpoint';
import { endpoints } from './endpoints/endpoints';

export function addEndpoints(services: IServiceCollection): IServiceCollection {
	for (const { serviceType, implType } of endpoints) {
		addTransientCtor(services, serviceType, implType);
	}

	return services;
}

export function mapEndpoints(app: IEndpointRouteBuilder): void {
	for (const descriptor of endpoints) {
		const requestDelegate = async (
			httpContext: IHttpContext,
		): Promise<void> => {
			const endpoint = getRequiredService<Endpoint<unknown, unknown>>(
				httpContext.requestServices,
				descriptor.serviceType,
			);

			const parseHttpRequestResult = endpoint.parseHttpRequest(
				httpContext.request,
			);

			if (parseHttpRequestResult.ok) {
				const handleResult = await endpoint.handle(
					httpContext,
					parseHttpRequestResult.val,
				);

				if (handleResult.ok) {
					await handleResult.val.executeResult(
						new ActionContext(httpContext),
					);
				} else {
					httpContext.response.statusCode =
						StatusCodes.Status400BadRequest;
					await write(httpContext.response, handleResult.val.message);
				}
			} else {
				httpContext.response.statusCode =
					StatusCodes.Status400BadRequest;
				await write(httpContext.response, '' /* TODO */);
			}
		};

		switch (descriptor.method) {
			case 'GET':
				mapGet(app, descriptor.endpoint, requestDelegate);
				break;

			case 'POST':
				mapPost(app, descriptor.endpoint, requestDelegate);
				break;
		}
	}
}
