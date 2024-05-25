import { Migration } from '@mikro-orm/migrations';

export class Migration20230703105327 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `external_links` (`id` int unsigned not null auto_increment primary key, `note_id` int unsigned not null, `url` text not null, `scheme` varchar(255) not null, `host` varchar(255) not null, `reversed_host` varchar(255) not null, `port` varchar(255) not null, `path` text not null, `query` text not null, `fragment` text not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
		);
		this.addSql(
			'alter table `external_links` add index `external_links_note_id_index`(`note_id`);',
		);
		this.addSql(
			'alter table `external_links` add index `external_links_user_id_index`(`user_id`);',
		);

		this.addSql(
			'alter table `external_links` add constraint `external_links_note_id_foreign` foreign key (`note_id`) references `notes` (`id`) on update cascade;',
		);
		this.addSql(
			'alter table `external_links` add constraint `external_links_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists `external_links`;');
	}
}
