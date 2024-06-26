import { MikroORM } from '@mikro-orm/core';
import {
	IEntityManager,
	IMikroORM,
} from '@shiori.link/server.mikro-orm.shared';
import {
	addModule as addMonolithModule,
	useModule as useMonolithModule,
} from '@shiori.link/server.monolith.module';
import {
	addModule as addUserModule,
	useModule as useUserModule,
} from '@shiori.link/server.user.module';
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
} from 'yohira';

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
	addSingletonFactory(services, IMikroORM, () => orm);

	addScopedFactory(services, IEntityManager, (serviceProvider) =>
		getRequiredService<MikroORM>(serviceProvider, IMikroORM).em.fork(),
	);

	addUserModule(services);
	addMonolithModule(services);

	addMvcCoreServices(services);

	const app = builder.build();

	if (!isDevelopment(app.env)) {
		useErrorHandler(app);
	}

	useAuthentication(app);

	useRouting(app);

	useUserModule(app);
	useMonolithModule(app);

	useEndpoints(app, () => {});

	const migrator = getRequiredService<MikroORM>(
		app.services,
		IMikroORM,
	).getMigrator();
	await migrator.up();

	await app.run();
}

main();
