import { Ref, ref } from '@mikro-orm/core';

import { Note } from './Note';
import { IUserOwnedEntity, User } from './User';

export abstract class ExternalLink implements IUserOwnedEntity {
	id!: number;
	user: Ref<User>;
	url: string;
	scheme: string;
	host: string;
	/**
	 * https://www.mediawiki.org/wiki/Manual:Externallinks_table
	 */
	reversedHost: string;
	port: string;
	path: string;
	query: string;
	fragment: string;

	protected constructor(user: User, url: URL) {
		this.user = ref(user);
		this.url = url.href;
		this.scheme = url.protocol.split(':')[0];
		this.host = url.hostname;
		this.reversedHost = url.hostname.split('.').reverse().join('.');
		this.port = url.port;
		this.path = url.pathname;
		this.query = url.search;
		this.fragment = url.hash;
	}
}

export class NoteExternalLink extends ExternalLink {
	note: Ref<Note>;

	constructor(note: Note, url: URL) {
		super(note.user.getEntity(), url);

		this.note = ref(note);
	}
}
