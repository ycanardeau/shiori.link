import { ContactCreateHandler } from '@/request-handlers/ContactCreateHandler';
import { ContactGetHandler } from '@/request-handlers/ContactGetHandler';
import { ContactListHandler } from '@/request-handlers/ContactListHandler';
import { NoteCreateHandler } from '@/request-handlers/NoteCreateHandler';
import { NoteGetHandler } from '@/request-handlers/NoteGetHandler';
import { NoteListHandler } from '@/request-handlers/NoteListHandler';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { UrlFetchHandler } from '@/request-handlers/UrlFetchHandler';
import { Ctor } from 'yohira';

interface RequestHandlerDescriptor {
	method: 'GET' | 'POST';
	serviceType: symbol;
	implType: Ctor<RequestHandler<unknown, unknown>>;
}

export const requestHandlerDescriptors: Record<
	string,
	RequestHandlerDescriptor
> = {
	'api/contact/create': {
		method: 'POST',
		serviceType: Symbol.for('ContactCreateHandler'),
		implType: ContactCreateHandler,
	},
	'api/contact/get': {
		method: 'GET',
		serviceType: Symbol.for('ContactGetHandler'),
		implType: ContactGetHandler,
	},
	'api/contact/list': {
		method: 'GET',
		serviceType: Symbol.for('ContactListHandler'),
		implType: ContactListHandler,
	},
	'/api/note/create': {
		method: 'POST',
		serviceType: Symbol.for('NoteCreateHandler'),
		implType: NoteCreateHandler,
	},
	'/api/note/get': {
		method: 'GET',
		serviceType: Symbol.for('NoteGetHandler'),
		implType: NoteGetHandler,
	},
	'/api/note/list': {
		method: 'GET',
		serviceType: Symbol.for('NoteListHandler'),
		implType: NoteListHandler,
	},
	'/api/url/fetch': {
		method: 'POST',
		serviceType: Symbol.for('UrlFetchHandler'),
		implType: UrlFetchHandler,
	},
};
