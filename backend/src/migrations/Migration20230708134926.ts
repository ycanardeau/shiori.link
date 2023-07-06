import { Migration } from '@mikro-orm/migrations';

export class Migration20230708134926 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'alter table `notes` add `root_id` int unsigned null, add `parent_id` int unsigned null;',
		);
		this.addSql(
			'alter table `notes` add constraint `notes_root_id_foreign` foreign key (`root_id`) references `notes` (`id`) on update cascade on delete set null;',
		);
		this.addSql(
			'alter table `notes` add constraint `notes_parent_id_foreign` foreign key (`parent_id`) references `notes` (`id`) on update cascade on delete set null;',
		);
		this.addSql(
			'alter table `notes` add index `notes_root_id_index`(`root_id`);',
		);
		this.addSql(
			'alter table `notes` add index `notes_parent_id_index`(`parent_id`);',
		);
	}

	async down(): Promise<void> {
		this.addSql(
			'alter table `notes` drop foreign key `notes_root_id_foreign`;',
		);
		this.addSql(
			'alter table `notes` drop foreign key `notes_parent_id_foreign`;',
		);

		this.addSql('alter table `notes` drop index `notes_root_id_index`;');
		this.addSql('alter table `notes` drop index `notes_parent_id_index`;');
		this.addSql('alter table `notes` drop `root_id`;');
		this.addSql('alter table `notes` drop `parent_id`;');
	}
}
