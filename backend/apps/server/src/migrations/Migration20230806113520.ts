import { Migration } from '@mikro-orm/migrations';

export class Migration20230806113520 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			"alter table `notes` modify `type` enum('Bookmark', 'Markdown', 'ContactReference') not null;",
		);
	}

	async down(): Promise<void> {
		this.addSql(
			"alter table `notes` modify `type` enum('Bookmark', 'Markdown') not null;",
		);
	}
}
