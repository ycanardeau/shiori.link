import { Ref } from '@mikro-orm/core';

export enum PasswordHashAlgorithm {
	Bcrypt = 'Bcrypt',
}

export class MonolithUser {
	id!: number;
	createdAt = new Date();
	userId: number;
	username: string;
	email: string;

	constructor({
		userId,
		username,
		email,
	}: {
		userId: number;
		username: string;
		email: string;
	}) {
		this.userId = userId;
		this.username = username;
		this.email = email;
	}
}

export interface IUserOwnedEntity {
	user: Ref<MonolithUser>;
}
