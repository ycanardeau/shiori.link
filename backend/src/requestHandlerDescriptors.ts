import { NoteCreateHandler } from '@/request-handlers/NoteCreateHandler';
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
	'/api/note/list': {
		method: 'GET',
		serviceType: Symbol.for('NoteListHandler'),
		implType: NoteListHandler,
	},
};
