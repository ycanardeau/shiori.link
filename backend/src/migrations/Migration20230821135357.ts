import { Migration } from '@mikro-orm/migrations';

export class Migration20230821135357 extends Migration {
	async up(): Promise<void> {
		this.addSql('alter table `notes` add `deleted` tinyint(1) not null;');
	}

	async down(): Promise<void> {
		this.addSql('alter table `notes` drop `deleted`;');
	}
}
