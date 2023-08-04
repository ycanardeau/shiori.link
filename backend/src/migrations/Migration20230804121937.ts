import { Migration } from '@mikro-orm/migrations';

export class Migration20230804121937 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			"alter table `notes` add `type` enum('Bookmark', 'Markdown') not null;",
		);
		this.addSql(
			'alter table `notes` add index `notes_type_index`(`type`);',
		);
	}

	async down(): Promise<void> {
		this.addSql('alter table `notes` drop index `notes_type_index`;');
		this.addSql('alter table `notes` drop `type`;');
	}
}
