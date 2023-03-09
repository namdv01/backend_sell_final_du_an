/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('shop', (table) => {
      table.uuid('id').primary();
      table.uuid('id_user').notNullable();
      table.string('name', 255).notNullable();
      table.text('address').notNullable();
      table.text('logo').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('shop');
};
