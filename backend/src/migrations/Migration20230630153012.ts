import { Migration } from '@mikro-orm/migrations';

export class Migration20230630153012 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `notes` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `text` text not null) default character set utf8mb4 engine = InnoDB;',
		);
		this.addSql(
			'alter table `notes` add index `notes_user_id_index`(`user_id`);',
		);

		this.addSql(
			'alter table `notes` add constraint `notes_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists `notes`;');
	}
}
