import { Note } from '@/entities/Note';
import { User } from '@/entities/User';
import {
	Entity,
	Enum,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
	ref,
} from '@mikro-orm/core';

export enum NoteEventType {
	NoteCreated = 'NoteCreated',
	NoteDeleted = 'NoteDeleted',
	DateAdded = 'DateAdded',
	DateRemoved = 'DateRemoved',
	PurchaseAdded = 'PurchaseAdded',
	PurchaseRemoved = 'PurchaseRemoved',
}

@Entity({ tableName: 'note_events' })
export class NoteEvent {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@ManyToOne()
	user: Ref<User>;

	@ManyToOne()
	note: Ref<Note>;

	@Enum(() => NoteEventType)
	type: NoteEventType;

	constructor(note: Note, type: NoteEventType) {
		this.user = note.user;
		this.note = ref(note);
		this.type = type;
	}
}
