import config from '@/mikro-orm.config';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { MikroORM } from '@mikro-orm/core';
import {
	Ctor,
	Envs,
	IHttpContext,
	StatusCodes,
	WebAppOptions,
	addHttpLogging,
	addRouting,
	addScopedFactory,
	addSingletonFactory,
	addStaticFiles,
	addTransientCtor,
	createWebAppBuilder,
	getRequiredService,
	mapGet,
	mapPost,
	useEndpoints,
	useHttpLogging,
	useRouting,
	useStaticFiles,
	write,
} from 'yohira';

interface RequestHandlerDescriptor {
	method: 'GET' | 'POST';
	serviceType: symbol;
	implType: Ctor<RequestHandler<unknown, unknown>>;
}

const requestHandlerDescriptors: Record<string, RequestHandlerDescriptor> = {};

async function main(): Promise<void> {
	// TODO: remove
	const options = new WebAppOptions();
	options.envName = process.env.NODE_ENV ?? Envs.Production;

	const builder = createWebAppBuilder(options);
	const services = builder.services;

	addStaticFiles(services);
	addHttpLogging(services);
	addRouting(services);

	// TODO: move
	const orm = await MikroORM.init(config);
	addSingletonFactory(services, Symbol.for('MikroORM'), () => {
		return orm;
	});

	addScopedFactory(
		services,
		Symbol.for('EntityManager'),
		(serviceProvider) => {
			const orm = getRequiredService<MikroORM>(
				serviceProvider,
				Symbol.for('MikroORM'),
			);
			return orm.em.fork();
		},
	);

	for (const { serviceType, implType } of Object.values(
		requestHandlerDescriptors,
	)) {
		addTransientCtor(services, serviceType, implType);
	}

	const app = builder.build();

	useStaticFiles(app);

	useHttpLogging(app);

	useRouting(app);

	for (const [endpoint, descriptor] of Object.entries(
		requestHandlerDescriptors,
	)) {
		const requestDelegate = async (
			httpContext: IHttpContext,
		): Promise<void> => {
			const requestHandler = getRequiredService<
				RequestHandler<unknown, unknown>
			>(httpContext.requestServices, descriptor.serviceType);

			const parseHttpRequestResult = requestHandler.parseHttpRequest(
				httpContext.request,
			);

			if (parseHttpRequestResult.ok) {
				const handleResult = await requestHandler.handle(
					httpContext,
					parseHttpRequestResult.val,
				);

				if (handleResult.ok) {
					return write(
						httpContext.response,
						JSON.stringify(handleResult.val),
					);
				} else {
					httpContext.response.statusCode =
						StatusCodes.Status400BadRequest;
					return write(
						httpContext.response,
						handleResult.val.message,
					);
				}
			} else {
				httpContext.response.statusCode =
					StatusCodes.Status400BadRequest;
				return write(httpContext.response, '' /* TODO */);
			}
		};

		switch (descriptor.method) {
			case 'GET':
				mapGet(app, endpoint, requestDelegate);
				break;

			case 'POST':
				mapPost(app, endpoint, requestDelegate);
				break;
		}
	}

	useEndpoints(app, () => {});

	await app.run();
}

main();
