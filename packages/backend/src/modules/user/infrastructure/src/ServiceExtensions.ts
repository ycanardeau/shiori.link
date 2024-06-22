import {
	ICurrentUserService,
	IEmailService,
	IPasswordServiceFactory,
} from '@shiori.link/server.user.application';
import { addSingletonCtor, addTransientCtor, IServiceCollection } from 'yohira';

import { CurrentUserService } from './services/CurrentUserService';
import { EmailService } from './services/EmailService';
import { PasswordServiceFactory } from './services/PasswordServiceFactory';

export function addInfrastructure(
	services: IServiceCollection,
): IServiceCollection {
	addSingletonCtor(services, IEmailService, EmailService);
	addSingletonCtor(services, IPasswordServiceFactory, PasswordServiceFactory);

	addTransientCtor(services, ICurrentUserService, CurrentUserService);

	return services;
}
