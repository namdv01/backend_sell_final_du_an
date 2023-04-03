/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('orderDetail', (table) => {
      table.uuid('id').primary();
      table.uuid('id_order').notNullable();
      table.uuid('id_product').notNullable();
      table.integer('quantity').notNullable().defaultTo(1);
      table.bigInteger('price').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('orderDetail');
};
