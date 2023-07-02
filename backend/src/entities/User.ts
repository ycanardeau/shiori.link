import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
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

	constructor(userName: string, email: string) {
		this.userName = userName;
		this.email = email;
	}

	get avatarUrl(): string {
		const hash = createHash('md5')
			.update(this.email.trim().toLowerCase())
			.digest('hex');
		return `https://www.gravatar.com/avatar/${hash}`;
	}
}
