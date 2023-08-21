import { Note } from '@/entities/Note';
import { User } from '@/entities/User';
import { NoteDataDto } from '@/models/dto/NoteDto';
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

@Entity({
	tableName: 'note_events',
	abstract: true,
	discriminatorColumn: 'type',
})
export abstract class NoteEvent<TNoteEventDataDto> {
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

	@Property({ columnType: 'text' })
	text: string;

	protected constructor(
		note: Note,
		type: NoteEventType,
		data: TNoteEventDataDto,
	) {
		this.user = note.user;
		this.note = ref(note);
		this.type = type;
		this.text = JSON.stringify(data);
	}

	get data(): TNoteEventDataDto {
		return JSON.parse(this.text);
	}
}

@Entity({
	tableName: 'note_events',
	discriminatorValue: NoteEventType.NoteCreated,
})
export class NoteCreatedNoteEvent extends NoteEvent<NoteDataDto> {
	constructor(note: Note, data: NoteDataDto) {
		super(note, NoteEventType.NoteCreated, data);
	}
}

@Entity({
	tableName: 'note_events',
	discriminatorValue: NoteEventType.NoteDeleted,
})
export class NoteDeletedNoteEvent extends NoteEvent<NoteDataDto> {
	constructor(note: Note, data: NoteDataDto) {
		super(note, NoteEventType.NoteDeleted, data);
	}
}
