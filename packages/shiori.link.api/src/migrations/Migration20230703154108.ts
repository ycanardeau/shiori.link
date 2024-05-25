import { Migration } from '@mikro-orm/migrations';

export class Migration20230703154108 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'alter table `external_links` drop foreign key `external_links_note_id_foreign`;',
		);

		this.addSql(
			"alter table `external_links` add `discr` enum('Note') not null;",
		);
		this.addSql(
			'alter table `external_links` modify `note_id` int unsigned null;',
		);
		this.addSql(
			'alter table `external_links` add constraint `external_links_note_id_foreign` foreign key (`note_id`) references `notes` (`id`) on update cascade on delete set null;',
		);
		this.addSql(
			'alter table `external_links` add index `external_links_discr_index`(`discr`);',
		);
	}

	async down(): Promise<void> {
		this.addSql(
			'alter table `external_links` drop foreign key `external_links_note_id_foreign`;',
		);

		this.addSql(
			'alter table `external_links` modify `note_id` int unsigned not null;',
		);
		this.addSql(
			'alter table `external_links` drop index `external_links_discr_index`;',
		);
		this.addSql('alter table `external_links` drop `discr`;');
		this.addSql(
			'alter table `external_links` add constraint `external_links_note_id_foreign` foreign key (`note_id`) references `notes` (`id`) on update cascade;',
		);
	}
}
