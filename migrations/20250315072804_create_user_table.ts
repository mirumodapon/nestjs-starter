import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('email', 256).unique();
    table.string('name', 64);
    table.boolean('is_ban').defaultTo(false);
    table.enum('role', ['USER', 'MANAGER', 'ADMIN', 'SUPER']).defaultTo('USER');

    table.timestamp('create_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at')
      .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
