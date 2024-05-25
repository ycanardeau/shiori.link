import { Migration } from '@mikro-orm/migrations';

export class Migration20230630150934 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists `users`;');
	}
}
