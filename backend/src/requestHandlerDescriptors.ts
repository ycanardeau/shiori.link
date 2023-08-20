import { BookmarkNoteCreateHandler } from '@/request-handlers/BookmarkNoteCreateHandler';
import { ContactCreateHandler } from '@/request-handlers/ContactCreateHandler';
import { ContactGetHandler } from '@/request-handlers/ContactGetHandler';
import { ContactListHandler } from '@/request-handlers/ContactListHandler';
import { MarkdownNoteCreateHandler } from '@/request-handlers/MarkdownNoteCreateHandler';
import { NoteGetHandler } from '@/request-handlers/NoteGetHandler';
import { NoteListHandler } from '@/request-handlers/NoteListHandler';
import { NotebookCreateHandler } from '@/request-handlers/NotebookCreateHandler';
import { NotebookGetHandler } from '@/request-handlers/NotebookGetHandler';
import { NotebookListHandler } from '@/request-handlers/NotebookListHandler';
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
	'/api/note/bookmark/create': {
		method: 'POST',
		serviceType: Symbol.for('BookmarkNoteCreateHandler'),
		implType: BookmarkNoteCreateHandler,
	},
	'/api/note/markdown/create': {
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
	'/api/notebook/create': {
		method: 'POST',
		serviceType: Symbol.for('NotebookCreateHandler'),
		implType: NotebookCreateHandler,
	},
	'/api/notebook/get': {
		method: 'GET',
		serviceType: Symbol.for('NotebookGetHandler'),
		implType: NotebookGetHandler,
	},
	'/api/notebook/list': {
		method: 'GET',
		serviceType: Symbol.for('NotebookListHandler'),
		implType: NotebookListHandler,
	},
	'/api/url/fetch': {
		method: 'POST',
		serviceType: Symbol.for('UrlFetchHandler'),
		implType: UrlFetchHandler,
	},
};
