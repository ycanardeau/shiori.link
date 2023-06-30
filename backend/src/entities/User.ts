import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property()
	userName: string;

	constructor(userName: string) {
		this.userName = userName;
	}
}
