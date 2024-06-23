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
	IEventDispatcher,
	IMessageBroker,
	IMessageDispatcher,
	InMemoryEventDispatcher,
	IQueueClient,
	MessageBroker,
	RedisClient,
	RedisMessageDispatcher,
} from '@shiori.link/server.shared';
import {
	addModule as addUserModule,
	useModule as useUserModule,
} from '@shiori.link/server.user.module';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import {
	addAuthentication,
	addCookie,
	addMvcCoreServices,
	addRouting,
	addScopedFactory,
	addSingletonCtor,
	addSingletonFactory,
	CookieAuthenticationDefaults,
	createWebAppBuilder,
	Envs,
	getRequiredService,
	ILoggerFactory,
	isDevelopment,
	LogLevel,
	useAuthentication,
	useEndpoints,
	useErrorHandler,
	useRouting,
	WebAppOptions,
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

	addSingletonCtor(services, IEventDispatcher, InMemoryEventDispatcher);

	addSingletonCtor(services, IQueueClient, RedisClient);
	addSingletonCtor(services, IMessageDispatcher, RedisMessageDispatcher);
	addSingletonCtor(services, IMessageBroker, MessageBroker);

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

	const connection = new IORedis({
		maxRetriesPerRequest: null,
	});

	new Worker(
		'async-queue',
		async (job) => {
			const loggerFactory = getRequiredService<ILoggerFactory>(
				app.services,
				ILoggerFactory,
			);
			const logger = loggerFactory.createLogger('');
			logger.log(
				LogLevel.Information,
				`Processing message with id: ${job.id} and payload ${job.data}`,
			);

			const message = JSON.parse(job.data);

			// TODO
		},
		{ connection: connection },
	);

	await app.run();
}

main();
