import { Migration } from '@mikro-orm/migrations';

export class Migration20230820233435 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			"create table `note_events` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `note_id` int unsigned not null, `type` enum('NoteCreated', 'NoteDeleted', 'DateAdded', 'DateRemoved', 'PurchaseAdded', 'PurchaseRemoved') not null, `text` text not null) default character set utf8mb4 engine = InnoDB;",
		);
		this.addSql(
			'alter table `note_events` add index `note_events_user_id_index`(`user_id`);',
		);
		this.addSql(
			'alter table `note_events` add index `note_events_note_id_index`(`note_id`);',
		);
		this.addSql(
			'alter table `note_events` add index `note_events_type_index`(`type`);',
		);

		this.addSql(
			'alter table `note_events` add constraint `note_events_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;',
		);
		this.addSql(
			'alter table `note_events` add constraint `note_events_note_id_foreign` foreign key (`note_id`) references `notes` (`id`) on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists `note_events`;');
	}
}
