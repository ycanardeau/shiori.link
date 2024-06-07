import {
	addEndpoints,
	mapEndpoints,
} from '@shiori.link/server.monolith.endpoints';
import { addInfrastructure } from '@shiori.link/server.monolith.infrastructure';
import {
	IAppBuilder,
	IEndpointRouteBuilder,
	IServiceCollection,
} from '@yohira/app';

export function addModule(services: IServiceCollection): IServiceCollection {
	addEndpoints(services);
	addInfrastructure(services);

	return services;
}

export function useModule(app: IAppBuilder & IEndpointRouteBuilder): void {
	mapEndpoints(app);
}
