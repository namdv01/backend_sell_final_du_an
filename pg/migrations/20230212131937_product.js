/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('product', (table) => {
      table.uuid('id').primary();
      table.string('name', 255).notNullable();
      table.integer('quantity').notNullable().defaultTo(10);
      table.integer('price').notNullable().defaultTo(1000000);
      table.uuid('id_shop').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('product');
};
