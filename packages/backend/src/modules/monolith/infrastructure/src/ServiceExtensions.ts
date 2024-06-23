import { IEventSubscriber } from '@shiori.link/server.shared';
import { addSingletonCtor, IServiceCollection } from 'yohira';

import { UserCreatedEventSubscriber } from './subscribers/UserCreatedEventSubscriber';

export function addInfrastructure(
	services: IServiceCollection,
): IServiceCollection {
	addSingletonCtor(services, IEventSubscriber, UserCreatedEventSubscriber);

	return services;
}
