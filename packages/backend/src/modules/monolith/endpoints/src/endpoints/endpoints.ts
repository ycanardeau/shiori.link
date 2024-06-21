import {
	BookmarkNoteCreateEndpoint,
	ContactCreateEndpoint,
	ContactGetEndpoint,
	ContactListEndpoint,
	MarkdownNoteCreateEndpoint,
	NotebookCreateEndpoint,
	NotebookGetEndpoint,
	NotebookListEndpoint,
	NoteGetEndpoint,
	NoteListEndpoint,
	UrlFetchEndpoint,
	UserGetEndpoint,
	UserLoginEndpoint,
	UserLogoutEndpoint,
	UserSignUpEndpoint,
} from '@shiori.link/server.monolith.endpoints';
import { Ctor } from 'yohira';

import { Endpoint } from './Endpoint';

export interface EndpointDescriptor {
	method: 'GET' | 'POST';
	endpoint: string;
	serviceType: symbol;
	implType: Ctor<Endpoint<unknown, unknown>>;
}

export const endpoints: EndpointDescriptor[] = [
	{
		method: 'POST',
		endpoint: '/contact/create',
		serviceType: Symbol.for('ContactCreateEndpoint'),
		implType: ContactCreateEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/contact/get',
		serviceType: Symbol.for('ContactGetEndpoint'),
		implType: ContactGetEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/contact/list',
		serviceType: Symbol.for('ContactListEndpoint'),
		implType: ContactListEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/note/bookmark/create',
		serviceType: Symbol.for('BookmarkNoteCreateEndpoint'),
		implType: BookmarkNoteCreateEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/note/markdown/create',
		serviceType: Symbol.for('MarkdownNoteCreateEndpoint'),
		implType: MarkdownNoteCreateEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/note/get',
		serviceType: Symbol.for('NoteGetEndpoint'),
		implType: NoteGetEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/note/list',
		serviceType: Symbol.for('NoteListEndpoint'),
		implType: NoteListEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/notebook/create',
		serviceType: Symbol.for('NotebookCreateEndpoint'),
		implType: NotebookCreateEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/notebook/get',
		serviceType: Symbol.for('NotebookGetEndpoint'),
		implType: NotebookGetEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/notebook/list',
		serviceType: Symbol.for('NotebookListEndpoint'),
		implType: NotebookListEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/url/fetch',
		serviceType: Symbol.for('UrlFetchEndpoint'),
		implType: UrlFetchEndpoint,
	},
	{
		method: 'GET',
		endpoint: '/user/get',
		serviceType: Symbol.for('UserGetEndpoint'),
		implType: UserGetEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/user/login',
		serviceType: Symbol.for('UserLoginEndpoint'),
		implType: UserLoginEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/user/logout',
		serviceType: Symbol.for('UserLogoutEndpoint'),
		implType: UserLogoutEndpoint,
	},
	{
		method: 'POST',
		endpoint: '/user/signup',
		serviceType: Symbol.for('UserSignUpEndpoint'),
		implType: UserSignUpEndpoint,
	},
];
