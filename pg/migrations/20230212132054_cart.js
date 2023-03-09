/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('cart', (table) => {
      table.uuid('id').primary();
      table.uuid('id_user').notNullable();
      table.uuid('id_product').notNullable();
      table.integer('quantity').notNullable().defaultTo(10);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('cart');
};
