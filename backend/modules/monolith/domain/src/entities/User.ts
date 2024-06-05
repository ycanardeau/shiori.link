import {
	Collection,
	Entity,
	Enum,
	OneToMany,
	PrimaryKey,
	Property,
	Ref,
} from '@mikro-orm/core';
import { createHash } from 'node:crypto';

import { Login } from './Login';

export enum PasswordHashAlgorithm {
	Bcrypt = 'Bcrypt',
}

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property()
	username: string;

	@Property()
	email: string;

	@Property()
	normalizedEmail: string;

	@Enum(() => PasswordHashAlgorithm)
	passwordHashAlgorithm: PasswordHashAlgorithm;

	@Property()
	salt: string;

	@Property()
	passwordHash: string;

	@OneToMany(() => Login, (login) => login.user)
	logins = new Collection(this);

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

	get avatarUrl(): string {
		const hash = createHash('md5')
			.update(this.email.trim().toLowerCase())
			.digest('hex');
		return `https://www.gravatar.com/avatar/${hash}`;
	}
}

export interface IUserOwnedEntity {
	user: Ref<User>;
}
