import { Ref, ref } from '@mikro-orm/core';

import { MonolithNote } from './MonolithNote';
import { IUserOwnedEntity, MonolithUser } from './MonolithUser';

export abstract class MonolithExternalLink implements IUserOwnedEntity {
	id!: number;
	user: Ref<MonolithUser>;
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

	protected constructor(user: MonolithUser, url: URL) {
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

export class MonolithNoteExternalLink extends MonolithExternalLink {
	note: Ref<MonolithNote>;

	constructor(note: MonolithNote, url: URL) {
		super(note.user.getEntity(), url);

		this.note = ref(note);
	}
}
