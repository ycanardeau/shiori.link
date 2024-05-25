import { Migration } from '@mikro-orm/migrations';

export class Migration20230808123053 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'alter table `notebooks` add `name` varchar(255) not null;',
		);
	}

	async down(): Promise<void> {
		this.addSql('alter table `notebooks` drop `name`;');
	}
}
