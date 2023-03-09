/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('order', (table) => {
      table.uuid('id').primary();
      table.uuid('id_buyer').notNullable();
      table.enum('status', ['watting', 'cancel', 'delivering', 'done']).notNullable();
      table.datetime('date', { precision: 6, useTz: true }).notNullable().defaultTo(knex.fn.now(6));
      table.boolean('payment').notNullable().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('order');
};
