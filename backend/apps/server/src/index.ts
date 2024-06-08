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
	createWebAppBuilder,
	isDevelopment,
	useAuthentication,
	useEndpoints,
	useErrorHandler,
	useRouting,
} from '@yohira/app';

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

	addUserModule(services);
	//addMonolithModule(services);

	addMvcCoreServices(services);

	const app = builder.build();

	if (!isDevelopment(app.env)) {
		useErrorHandler(app);
	}

	useAuthentication(app);

	useRouting(app);

	useUserModule(app);
	//useMonolithModule(app);

	useEndpoints(app, () => {});

	await app.run();
}

main();
