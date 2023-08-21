import { Migration } from '@mikro-orm/migrations';

export class Migration20230821144029 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'alter table `notebooks` add `deleted` tinyint(1) not null default false;',
		);
	}

	async down(): Promise<void> {
		this.addSql('alter table `notebooks` drop `deleted`;');
	}
}
