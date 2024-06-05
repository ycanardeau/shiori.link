import { Endpoint } from '@/endpoints/Endpoint';
import { UserGetEndpoint } from '@/endpoints/UserGetEndpoint';
import { UserLoginEndpoint } from '@/endpoints/UserLoginEndpoint';
import { UserLogoutEndpoint } from '@/endpoints/UserLogoutEndpoint';
import { UserSignUpEndpoint } from '@/endpoints/UserSignUpEndpoint';
import { Ctor } from 'yohira';

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
