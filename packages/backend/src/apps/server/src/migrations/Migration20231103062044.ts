import { Migration } from '@mikro-orm/migrations';

export class Migration20231103062044 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `logins` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `ip` varchar(255) not null, `success` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `logins` add index `logins_user_id_index`(`user_id`);');

    this.addSql('alter table `logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `logins`;');
  }

}
