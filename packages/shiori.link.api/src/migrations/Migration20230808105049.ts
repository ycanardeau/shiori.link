import { Migration } from '@mikro-orm/migrations';

export class Migration20230808105049 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'alter table `notes` drop foreign key `notes_notebook_id_foreign`;',
		);

		this.addSql(
			'alter table `notes` modify `notebook_id` int unsigned not null;',
		);
		this.addSql(
			'alter table `notes` add constraint `notes_notebook_id_foreign` foreign key (`notebook_id`) references `notebooks` (`id`) on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql(
			'alter table `notes` drop foreign key `notes_notebook_id_foreign`;',
		);

		this.addSql(
			'alter table `notes` modify `notebook_id` int unsigned null;',
		);
		this.addSql(
			'alter table `notes` add constraint `notes_notebook_id_foreign` foreign key (`notebook_id`) references `notebooks` (`id`) on update cascade on delete set null;',
		);
	}
}
