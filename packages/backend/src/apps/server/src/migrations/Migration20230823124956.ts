import { Migration } from '@mikro-orm/migrations';

export class Migration20230823124956 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			"alter table `users` add `password_hash_algorithm` enum('Bcrypt') not null, add `salt` varchar(255) not null, add `password_hash` varchar(255) not null;",
		);
	}

	async down(): Promise<void> {
		this.addSql('alter table `users` drop `password_hash_algorithm`;');
		this.addSql('alter table `users` drop `salt`;');
		this.addSql('alter table `users` drop `password_hash`;');
	}
}
