import { endpoints } from '@/endpoints';
import { Endpoint } from '@/endpoints/Endpoint';
import config from '@/mikro-orm.config';
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
	ActionContext,
	CookieAuthenticationDefaults,
	Envs,
	IHttpContext,
	StatusCodes,
	WebAppOptions,
	addAuthentication,
	addCookie,
	addHttpLogging,
	addMvcCoreServices,
	addRouting,
	addScopedFactory,
	addSingletonCtor,
	addSingletonFactory,
	addTransientCtor,
	createWebAppBuilder,
	getRequiredService,
	isDevelopment,
	mapGet,
	mapPost,
	useAuthentication,
	useEndpoints,
	useErrorHandler,
	useRouting,
	write,
} from 'yohira';

async function main(): Promise<void> {
	// TODO: remove
	const options = new WebAppOptions();
	options.envName = process.env.NODE_ENV ?? Envs.Production;

	const builder = createWebAppBuilder(options);
	const services = builder.services;

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

	for (const { serviceType, implType } of endpoints) {
		addTransientCtor(services, serviceType, implType);
	}

	addMvcCoreServices(services);

	const app = builder.build();

	if (!isDevelopment(app.env)) {
		useErrorHandler(app);
	}

	useAuthentication(app);

	useRouting(app);

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
				mapGet(app, descriptor.endpoint, requestDelegate);
				break;

			case 'POST':
				mapPost(app, descriptor.endpoint, requestDelegate);
				break;
		}
	}

	useEndpoints(app, () => {});

	const migrator = orm.getMigrator();
	await migrator.up();

	await app.run();
}

main();
