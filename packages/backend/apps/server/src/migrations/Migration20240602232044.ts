import { Migration } from '@mikro-orm/migrations';

export class Migration20240602232044 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `notes` modify `type` enum(\'Bookmark\', \'Markdown\') not null;');

    this.addSql('alter table `contacts` drop column `first_name`, drop column `last_name`;');

    this.addSql('alter table `contacts` add `name` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `notes` modify `type` enum(\'Bookmark\', \'Markdown\') not null;');

    this.addSql('alter table `contacts` add `last_name` varchar(255) not null;');
    this.addSql('alter table `contacts` change `name` `first_name` varchar(255) not null;');
  }

}
