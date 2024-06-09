import { Ctor } from 'yohira';

import { Endpoint } from './Endpoint';
import { UserGetEndpoint } from './UserGetEndpoint';
import { UserLoginEndpoint } from './UserLoginEndpoint';
import { UserLogoutEndpoint } from './UserLogoutEndpoint';
import { UserSignUpEndpoint } from './UserSignUpEndpoint';

export interface EndpointDescriptor {
	method: 'GET' | 'POST';
	endpoint: string;
	serviceType: symbol;
	implType: Ctor<Endpoint<unknown, unknown>>;
}

export const endpoints: EndpointDescriptor[] = [
	{
		method: 'GET',
		endpoint: '/users/get',
		serviceType: Symbol.for('UserGetEndpoint'),
		implType: UserGetEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/users/login',
		serviceType: Symbol.for('UserLoginEndpoint'),
		implType: UserLoginEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/users/logout',
		serviceType: Symbol.for('UserLogoutEndpoint'),
		implType: UserLogoutEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/users/signup',
		serviceType: Symbol.for('UserSignUpEndpoint'),
		implType: UserSignUpEndpoint,
	},
];
