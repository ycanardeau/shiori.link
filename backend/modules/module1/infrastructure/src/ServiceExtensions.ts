import { MikroORM } from '@mikro-orm/core';
import {
	ICurrentUserService,
	IEmailService,
	IPasswordServiceFactory,
} from '@shiori.link/server.module1.application';
import {
	IServiceCollection,
	addScopedFactory,
	addSingletonCtor,
	addSingletonFactory,
	addTransientCtor,
	getRequiredService,
} from '@yohira/app';

import config from './mikro-orm.config';
import { CurrentUserService } from './services/CurrentUserService';
import { EmailService } from './services/EmailService';
import { PasswordServiceFactory } from './services/PasswordServiceFactory';

const orm = MikroORM.initSync(config);

function addMikroORM(services: IServiceCollection): IServiceCollection {
	addSingletonFactory(services, Symbol.for('MikroORM'), () => orm);

	addScopedFactory(services, Symbol.for('EntityManager'), (serviceProvider) =>
		getRequiredService<MikroORM>(
			serviceProvider,
			Symbol.for('MikroORM'),
		).em.fork(),
	);

	return services;
}

export function addInfrastructure(
	services: IServiceCollection,
): IServiceCollection {
	addMikroORM(services);

	addSingletonCtor(services, IEmailService, EmailService);
	addSingletonCtor(services, IPasswordServiceFactory, PasswordServiceFactory);

	addTransientCtor(services, ICurrentUserService, CurrentUserService);

	return services;
}
