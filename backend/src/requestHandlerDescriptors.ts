import { BookmarkNoteCreateHandler } from '@/request-handlers/BookmarkNoteCreateHandler';
import { ContactCreateHandler } from '@/request-handlers/ContactCreateHandler';
import { MarkdownNoteCreateHandler } from '@/request-handlers/MarkdownNoteCreateHandler';
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
	'/api/note/create-bookmark': {
		method: 'POST',
		serviceType: Symbol.for('BookmarkNoteCreateHandler'),
		implType: BookmarkNoteCreateHandler,
	},
	'/api/note/create-markdown': {
		method: 'POST',
		serviceType: Symbol.for('MarkdownNoteCreateHandler'),
		implType: MarkdownNoteCreateHandler,
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
