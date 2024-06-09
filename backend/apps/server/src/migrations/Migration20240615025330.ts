import { Migration } from '@mikro-orm/migrations';

export class Migration20240615025330 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user`.`users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `username` varchar(255) not null, `email` varchar(255) not null, `normalized_email` varchar(255) not null, `password_hash_algorithm` enum(\'Bcrypt\') not null, `salt` varchar(255) not null, `password_hash` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user`.`logins` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `ip` varchar(255) not null, `success` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user`.`logins` add index `logins_user_id_index`(`user_id`);');

    this.addSql('alter table `user`.`logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `user`.`users` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user`.`logins` drop foreign key `logins_user_id_foreign`;');

    this.addSql('drop table if exists `user`.`users`;');

    this.addSql('drop table if exists `user`.`logins`;');

    this.addSql('drop schema if exists `user`;');
  }

}
