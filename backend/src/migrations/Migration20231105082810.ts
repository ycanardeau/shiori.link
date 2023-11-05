import { Migration } from '@mikro-orm/migrations';

export class Migration20231105082810 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` change `user_name` `username` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` change `username` `user_name` varchar(255) not null;');
  }

}
