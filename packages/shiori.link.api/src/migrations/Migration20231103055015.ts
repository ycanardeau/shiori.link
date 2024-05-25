import { Migration } from '@mikro-orm/migrations';

export class Migration20231103055015 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` add `normalized_email` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` drop `normalized_email`;');
  }

}
