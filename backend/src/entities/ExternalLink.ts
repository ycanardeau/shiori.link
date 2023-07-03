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

@Entity({ tableName: 'external_links' })
export class ExternalLink {
	@PrimaryKey()
	id!: number;

	@ManyToOne()
	user: Ref<User>;

	@ManyToOne()
	note: Ref<Note>;

	@Property({ columnType: 'text' })
	url: string;

	@Property()
	scheme: string;

	@Property()
	host: string;

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

	constructor(note: Note, url: URL) {
		this.user = note.user;
		this.note = ref(note);
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
