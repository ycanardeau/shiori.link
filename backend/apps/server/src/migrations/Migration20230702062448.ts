import { Migration } from '@mikro-orm/migrations';

export class Migration20230702062448 extends Migration {
	async up(): Promise<void> {
		this.addSql('alter table `users` add `email` varchar(255) not null;');
	}

	async down(): Promise<void> {
		this.addSql('alter table `users` drop `email`;');
	}
}
