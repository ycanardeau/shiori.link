interface UserCreatedEventPayload {
	readonly id: number;
	readonly username: string;
	readonly email: string;
}

export class UserCreatedEvent {
	readonly name = UserCreatedEvent.name;

	constructor(readonly payload: UserCreatedEventPayload) {}
}
