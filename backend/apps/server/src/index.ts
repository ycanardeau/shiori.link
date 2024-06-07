import { MikroORM } from '@mikro-orm/core';
import {
	addModule as addMonolithModule,
	useModule as useMonolithModule,
} from '@shiori.link/server.monolith.module';
import {
	CookieAuthenticationDefaults,
	Envs,
	WebAppOptions,
	addAuthentication,
	addCookie,
	addMvcCoreServices,
	addRouting,
	addScopedFactory,
	addSingletonFactory,
	createWebAppBuilder,
	getRequiredService,
	isDevelopment,
	useAuthentication,
	useEndpoints,
	useErrorHandler,
	useRouting,
} from '@yohira/app';

import config from './mikro-orm.config';

async function main(): Promise<void> {
	// TODO: remove
	const options = new WebAppOptions();
	options.envName = process.env.NODE_ENV ?? Envs.Production;

	const builder = createWebAppBuilder(options);
	const services = builder.services;

	addRouting(services);

	addCookie(
		addAuthentication(
			services,
			CookieAuthenticationDefaults.authenticationScheme,
		),
	);

	// TODO: move
	const orm = await MikroORM.init(config);
	addSingletonFactory(services, Symbol.for('MikroORM'), () => orm);

	addScopedFactory(services, Symbol.for('EntityManager'), (serviceProvider) =>
		getRequiredService<MikroORM>(
			serviceProvider,
			Symbol.for('MikroORM'),
		).em.fork(),
	);

	addMonolithModule(services);

	addMvcCoreServices(services);

	const app = builder.build();

	if (!isDevelopment(app.env)) {
		useErrorHandler(app);
	}

	useAuthentication(app);

	useRouting(app);

	useMonolithModule(app);

	useEndpoints(app, () => {});

	const migrator = orm.getMigrator();
	await migrator.up();

	await app.run();
}

main();
