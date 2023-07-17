import { Migration } from '@mikro-orm/migrations';

export class Migration20230717083502 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `contacts` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;',
		);
		this.addSql(
			'alter table `contacts` add index `contacts_user_id_index`(`user_id`);',
		);

		this.addSql(
			'alter table `contacts` add constraint `contacts_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists `contacts`;');
	}
}
