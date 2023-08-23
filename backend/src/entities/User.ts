import { PasswordHashAlgorithm } from '@/models/enums/PasswordHashAlgorithm';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { createHash } from 'node:crypto';

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property()
	userName: string;

	@Property()
	email: string;

	@Enum(() => PasswordHashAlgorithm)
	passwordHashAlgorithm: PasswordHashAlgorithm;

	@Property()
	salt: string;

	@Property()
	passwordHash: string;

	constructor({
		userName,
		email,
		passwordHashAlgorithm,
		salt,
		passwordHash,
	}: {
		userName: string;
		email: string;
		passwordHashAlgorithm: PasswordHashAlgorithm;
		salt: string;
		passwordHash: string;
	}) {
		this.userName = userName;
		this.email = email;
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
