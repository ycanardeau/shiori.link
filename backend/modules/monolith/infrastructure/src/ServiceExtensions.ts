import { MikroORM } from '@mikro-orm/core';
import {
	IServiceCollection,
	addScopedFactory,
	addSingletonCtor,
	addSingletonFactory,
	addTransientCtor,
	getRequiredService,
} from '@yohira/app';

import config from './mikro-orm.config';

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

	return services;
}
