import { Collection, Ref } from '@mikro-orm/core';

import { UserLogin } from './UserLogin';

export enum PasswordHashAlgorithm {
	Bcrypt = 'Bcrypt',
}

export class UserUser {
	id!: number;
	createdAt = new Date();
	username: string;
	email: string;
	normalizedEmail: string;
	passwordHashAlgorithm: PasswordHashAlgorithm;
	salt: string;
	passwordHash: string;
	logins = new Collection<UserLogin>(this);

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
	user: Ref<UserUser>;
}
