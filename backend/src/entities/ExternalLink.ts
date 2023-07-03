import { Note } from '@/entities/Note';
import { User } from '@/entities/User';
import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

@Entity({
	tableName: 'external_links',
	abstract: true,
	discriminatorColumn: 'discr',
})
export abstract class ExternalLink {
	@PrimaryKey()
	id!: number;

	@ManyToOne()
	user: Ref<User>;

	@Property({ columnType: 'text' })
	url: string;

	@Property()
	scheme: string;

	@Property()
	host: string;

	/**
	 * https://www.mediawiki.org/wiki/Manual:Externallinks_table
	 */
	@Property()
	reversedHost: string;

	@Property()
	port: string;

	@Property({ columnType: 'text' })
	path: string;

	@Property({ columnType: 'text' })
	query: string;

	@Property({ columnType: 'text' })
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

@Entity({ tableName: 'external_links', discriminatorValue: 'Note' })
export class NoteExternalLink extends ExternalLink {
	@ManyToOne()
	note: Ref<Note>;

	constructor(note: Note, url: URL) {
		super(note.user.getEntity(), url);

		this.note = ref(note);
	}
}
