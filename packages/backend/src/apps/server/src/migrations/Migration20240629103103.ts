import { Migration } from '@mikro-orm/migrations';

export class Migration20240629103103 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `monolith`.`logins`;');

    this.addSql('alter table `monolith`.`users` drop column `normalized_email`, drop column `password_hash_algorithm`, drop column `salt`, drop column `password_hash`;');

    this.addSql('alter table `monolith`.`users` add `user_id` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('create table `monolith`.`logins` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `ip` varchar(255) not null, `success` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`logins` add index `logins_user_id_index`(`user_id`);');

    this.addSql('alter table `monolith`.`logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`users` drop column `user_id`;');

    this.addSql('alter table `monolith`.`users` add `normalized_email` varchar(255) not null, add `password_hash_algorithm` enum(\'Bcrypt\') not null, add `salt` varchar(255) not null, add `password_hash` varchar(255) not null;');
  }

}
