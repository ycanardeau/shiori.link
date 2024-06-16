import { Collection, Ref, ref } from '@mikro-orm/core';

import { NoteExternalLink } from './ExternalLink';
import { Notebook } from './Notebook';
import { IUserOwnedEntity, User } from './User';

export enum NoteType {
	Bookmark = 'Bookmark',
	Markdown = 'Markdown',
}

export interface NotePayloadBase<T extends NoteType> {
	_NotePayloadBrand: any;
	type: T;
}

export interface BookmarkNotePayload
	extends NotePayloadBase<NoteType.Bookmark> {
	url: string;
	title: string;
}

export interface MarkdownNotePayload
	extends NotePayloadBase<NoteType.Markdown> {
	text: string;
}

export type NotePayload = BookmarkNotePayload | MarkdownNotePayload;

export abstract class Note<
	TNoteType extends NoteType = NoteType,
	TNotePayload extends NotePayload = NotePayload,
> implements IUserOwnedEntity
{
	id!: number;
	createdAt = new Date();
	type!: TNoteType;
	user: Ref<User>;
	notebook: Ref<Notebook>;
	text: string;
	externalLinks = new Collection<NoteExternalLink>(this);

	constructor(notebook: Notebook, payload: TNotePayload) {
		this.user = notebook.user;
		this.notebook = ref(notebook);
		this.text = JSON.stringify(payload);
	}
}

export class BookmarkNote extends Note<
	NoteType.Bookmark,
	BookmarkNotePayload
> {}

export class MarkdownNote extends Note<
	NoteType.Markdown,
	MarkdownNotePayload
> {}
