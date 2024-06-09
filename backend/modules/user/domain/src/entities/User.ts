import { Collection, Ref } from '@mikro-orm/core';
import { Login } from './Login';

export enum PasswordHashAlgorithm {
	Bcrypt = 'Bcrypt',
}

export class User {
	id!: number;
	createdAt = new Date();
	username: string;
	email: string;
	normalizedEmail: string;
	passwordHashAlgorithm: PasswordHashAlgorithm;
	salt: string;
	passwordHash: string;
	logins = new Collection<Login>(this);

	constructor({
		username,
		email,
		normalizedEmail,
		passwordHashAlgorithm,
		salt,
		passwordHash,
	}: {
		username: string;
		email: string;
		normalizedEmail: string;
		passwordHashAlgorithm: PasswordHashAlgorithm;
		salt: string;
		passwordHash: string;
	}) {
		this.username = username;
		this.email = email;
		this.normalizedEmail = normalizedEmail;
		this.passwordHashAlgorithm = passwordHashAlgorithm;
		this.salt = salt;
		this.passwordHash = passwordHash;
	}
}

export interface IUserOwnedEntity {
	user: Ref<User>;
}
