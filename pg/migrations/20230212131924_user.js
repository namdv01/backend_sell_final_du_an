/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('user', (table) => {
      table.uuid('id').primary();
      table.string('email', 64).unique().notNullable();
      table.string('password', 255).notNullable();
      table.string('fullname', 128).notNullable();
      table.string('phone', 20);
      table.text('avatar').notNullable();
      table.enum('gender', ['male', 'female', 'other']).notNullable();
      table.enum('role', ['admin', 'seller', 'buyer']).notNullable();
      table.integer('numberShop').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('user');
};
