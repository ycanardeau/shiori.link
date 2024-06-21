import { Collection, Ref, ref } from '@mikro-orm/core';

import { MonolithNoteExternalLink } from './MonolithExternalLink';
import { MonolithNotebook } from './MonolithNotebook';
import { IUserOwnedEntity, MonolithUser } from './MonolithUser';

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

export abstract class MonolithNote<
	TNoteType extends NoteType = NoteType,
	TNotePayload extends NotePayload = NotePayload,
> implements IUserOwnedEntity
{
	id!: number;
	createdAt = new Date();
	type!: TNoteType;
	user: Ref<MonolithUser>;
	notebook: Ref<MonolithNotebook>;
	text: string;
	externalLinks = new Collection<MonolithNoteExternalLink>(this);

	constructor(notebook: MonolithNotebook, payload: TNotePayload) {
		this.user = notebook.user;
		this.notebook = ref(notebook);
		this.text = JSON.stringify(payload);
	}
}

export class MonolithBookmarkNote extends MonolithNote<
	NoteType.Bookmark,
	BookmarkNotePayload
> {}

export class MonolithMarkdownNote extends MonolithNote<
	NoteType.Markdown,
	MarkdownNotePayload
> {}
