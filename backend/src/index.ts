import config from '@/mikro-orm.config';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { requestHandlerDescriptors } from '@/requestHandlerDescriptors';
import {
	CurrentUserService,
	ICurrentUserService,
} from '@/services/CurrentUserService';
import { EmailService, IEmailService } from '@/services/EmailService';
import {
	IPasswordServiceFactory,
	PasswordServiceFactory,
} from '@/services/PasswordServiceFactory';
import { MikroORM } from '@mikro-orm/core';
import {
	CookieAuthenticationDefaults,
	Envs,
	IHttpContext,
	StatusCodes,
	WebAppOptions,
	addAuthentication,
	addCookie,
	addHttpLogging,
	addRouting,
	addScopedFactory,
	addSingletonCtor,
	addSingletonFactory,
	addStaticFiles,
	addTransientCtor,
	createWebAppBuilder,
	getRequiredService,
	mapGet,
	mapPost,
	useAuthentication,
	useEndpoints,
	useHttpLogging,
	useRouting,
	useStaticFiles,
	write,
} from 'yohira';

async function main(): Promise<void> {
	// TODO: remove
	const options = new WebAppOptions();
	options.envName = process.env.NODE_ENV ?? Envs.Production;

	const builder = createWebAppBuilder(options);
	const services = builder.services;

	addStaticFiles(services);
	addHttpLogging(services);
	addRouting(services);

	addCookie(
		addAuthentication(
			services,
			CookieAuthenticationDefaults.authenticationScheme,
		),
	);

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

	addSingletonCtor(services, IEmailService, EmailService);
	addSingletonCtor(services, IPasswordServiceFactory, PasswordServiceFactory);

	addTransientCtor(services, ICurrentUserService, CurrentUserService);

	for (const { serviceType, implType } of Object.values(
		requestHandlerDescriptors,
	)) {
		addTransientCtor(services, serviceType, implType);
	}

	const app = builder.build();

	useStaticFiles(app);

	useHttpLogging(app);

	useAuthentication(app);

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
