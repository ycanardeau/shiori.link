import {
	addEndpoints,
	mapEndpoints,
} from '@shiori.link/server.user.endpoints';
import { addInfrastructure } from '@shiori.link/server.user.infrastructure';
import {
	IAppBuilder,
	IEndpointRouteBuilder,
	IServiceCollection,
} from 'yohira';

export function addModule(services: IServiceCollection): IServiceCollection {
	addEndpoints(services);
	addInfrastructure(services);

	return services;
}

export function useModule(app: IAppBuilder & IEndpointRouteBuilder): void {
	mapEndpoints(app);
}
