import { Migration } from '@mikro-orm/migrations';

export class Migration20240620150851 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `monolith`.`users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `username` varchar(255) not null, `email` varchar(255) not null, `normalized_email` varchar(255) not null, `password_hash_algorithm` enum(\'Bcrypt\') not null, `salt` varchar(255) not null, `password_hash` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `monolith`.`notebooks` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`notebooks` add index `notebooks_user_id_index`(`user_id`);');

    this.addSql('create table `monolith`.`notes` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `type` enum(\'Bookmark\', \'Markdown\') not null, `user_id` int unsigned not null, `notebook_id` int unsigned not null, `text` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`notes` add index `notes_type_index`(`type`);');
    this.addSql('alter table `monolith`.`notes` add index `notes_user_id_index`(`user_id`);');
    this.addSql('alter table `monolith`.`notes` add index `notes_notebook_id_index`(`notebook_id`);');

    this.addSql('create table `monolith`.`logins` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `ip` varchar(255) not null, `success` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`logins` add index `logins_user_id_index`(`user_id`);');

    this.addSql('create table `monolith`.`external_links` (`id` int unsigned not null auto_increment primary key, `user_id` int unsigned not null, `url` text not null, `scheme` varchar(255) not null, `host` varchar(255) not null, `reversed_host` varchar(255) not null, `port` varchar(255) not null, `path` text not null, `query` text not null, `fragment` text not null, `discr` enum(\'Note\') not null, `note_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`external_links` add index `external_links_user_id_index`(`user_id`);');
    this.addSql('alter table `monolith`.`external_links` add index `external_links_discr_index`(`discr`);');
    this.addSql('alter table `monolith`.`external_links` add index `external_links_note_id_index`(`note_id`);');

    this.addSql('create table `monolith`.`contacts` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `monolith`.`contacts` add index `contacts_user_id_index`(`user_id`);');

    this.addSql('create table `user`.`users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `username` varchar(255) not null, `email` varchar(255) not null, `normalized_email` varchar(255) not null, `password_hash_algorithm` enum(\'Bcrypt\') not null, `salt` varchar(255) not null, `password_hash` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user`.`logins` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `user_id` int unsigned not null, `ip` varchar(255) not null, `success` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user`.`logins` add index `logins_user_id_index`(`user_id`);');

    this.addSql('alter table `monolith`.`notebooks` add constraint `notebooks_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`notes` add constraint `notes_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');
    this.addSql('alter table `monolith`.`notes` add constraint `notes_notebook_id_foreign` foreign key (`notebook_id`) references `monolith`.`notebooks` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`external_links` add constraint `external_links_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');
    this.addSql('alter table `monolith`.`external_links` add constraint `external_links_note_id_foreign` foreign key (`note_id`) references `monolith`.`notes` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `monolith`.`contacts` add constraint `contacts_user_id_foreign` foreign key (`user_id`) references `monolith`.`users` (`id`) on update cascade;');

    this.addSql('alter table `user`.`logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `user`.`users` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `monolith`.`notebooks` drop foreign key `notebooks_user_id_foreign`;');

    this.addSql('alter table `monolith`.`notes` drop foreign key `notes_user_id_foreign`;');

    this.addSql('alter table `monolith`.`logins` drop foreign key `logins_user_id_foreign`;');

    this.addSql('alter table `monolith`.`external_links` drop foreign key `external_links_user_id_foreign`;');

    this.addSql('alter table `monolith`.`contacts` drop foreign key `contacts_user_id_foreign`;');

    this.addSql('alter table `monolith`.`notes` drop foreign key `notes_notebook_id_foreign`;');

    this.addSql('alter table `monolith`.`external_links` drop foreign key `external_links_note_id_foreign`;');

    this.addSql('alter table `user`.`logins` drop foreign key `logins_user_id_foreign`;');

    this.addSql('drop table if exists `monolith`.`users`;');

    this.addSql('drop table if exists `monolith`.`notebooks`;');

    this.addSql('drop table if exists `monolith`.`notes`;');

    this.addSql('drop table if exists `monolith`.`logins`;');

    this.addSql('drop table if exists `monolith`.`external_links`;');

    this.addSql('drop table if exists `monolith`.`contacts`;');

    this.addSql('drop table if exists `user`.`users`;');

    this.addSql('drop table if exists `user`.`logins`;');

    this.addSql('alter table `monolith`.`notebooks` drop foreign key `notebooks_user_id_foreign`;');

    this.addSql('alter table `monolith`.`notes` drop foreign key `notes_user_id_foreign`;');
    this.addSql('alter table `monolith`.`notes` drop foreign key `notes_notebook_id_foreign`;');

    this.addSql('alter table `monolith`.`logins` drop foreign key `logins_user_id_foreign`;');

    this.addSql('alter table `monolith`.`external_links` drop foreign key `external_links_user_id_foreign`;');
    this.addSql('alter table `monolith`.`external_links` drop foreign key `external_links_note_id_foreign`;');

    this.addSql('alter table `monolith`.`contacts` drop foreign key `contacts_user_id_foreign`;');

    this.addSql('alter table `monolith`.`notebooks` add constraint `notebooks_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`notes` add constraint `notes_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');
    this.addSql('alter table `monolith`.`notes` add constraint `notes_notebook_id_foreign` foreign key (`notebook_id`) references `notebooks` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`logins` add constraint `logins_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');

    this.addSql('alter table `monolith`.`external_links` add constraint `external_links_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');
    this.addSql('alter table `monolith`.`external_links` add constraint `external_links_note_id_foreign` foreign key (`note_id`) references `notes` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `monolith`.`contacts` add constraint `contacts_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');

    this.addSql('drop schema if exists `monolith`;');
    this.addSql('drop schema if exists `user`;');
  }

}
