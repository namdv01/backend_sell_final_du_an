/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('comment', (table) => {
      table.uuid('id').primary();
      table.uuid('id_product').notNullable();
      table.uuid('id_order').notNullable();
      table.text('content').notNullable();
      table.integer('star').defaultTo(5);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('comment');
};

