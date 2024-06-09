import { MikroORM } from '@mikro-orm/core';
import {
	IEntityManager,
	IMikroORM,
} from '@shiori.link/server.monolith.application';
import {
	IServiceCollection,
	addScopedFactory,
	addSingletonFactory,
	getRequiredService,
} from '@yohira/app';

import config from './mikro-orm.config';

const orm = MikroORM.initSync(config);

function addMikroORM(services: IServiceCollection): IServiceCollection {
	addSingletonFactory(services, IMikroORM, () => orm);

	addScopedFactory(services, IEntityManager, (serviceProvider) =>
		getRequiredService<MikroORM>(serviceProvider, IMikroORM).em.fork(),
	);

	return services;
}

export function addInfrastructure(
	services: IServiceCollection,
): IServiceCollection {
	addMikroORM(services);

	return services;
}
