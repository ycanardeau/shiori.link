import { NoteCreateHandler } from '@/request-handlers/NoteCreateHandler';
import { NoteGetHandler } from '@/request-handlers/NoteGetHandler';
import { NoteListHandler } from '@/request-handlers/NoteListHandler';
import { RequestHandler } from '@/request-handlers/RequestHandler';
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
};
