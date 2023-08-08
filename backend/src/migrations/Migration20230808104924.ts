import { Migration } from '@mikro-orm/migrations';

export class Migration20230808104924 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `notebooks` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
		);
		this.addSql(
			'alter table `notebooks` add index `notebooks_user_id_index`(`user_id`);',
		);

		this.addSql(
			'alter table `notebooks` add constraint `notebooks_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;',
		);

		this.addSql('alter table `notes` add `notebook_id` int unsigned null;');
		this.addSql(
			'alter table `notes` add constraint `notes_notebook_id_foreign` foreign key (`notebook_id`) references `notebooks` (`id`) on update cascade on delete set null;',
		);
		this.addSql(
			'alter table `notes` add index `notes_notebook_id_index`(`notebook_id`);',
		);
	}

	async down(): Promise<void> {
		this.addSql(
			'alter table `notes` drop foreign key `notes_notebook_id_foreign`;',
		);

		this.addSql('drop table if exists `notebooks`;');

		this.addSql(
			'alter table `notes` drop index `notes_notebook_id_index`;',
		);
		this.addSql('alter table `notes` drop `notebook_id`;');
	}
}
