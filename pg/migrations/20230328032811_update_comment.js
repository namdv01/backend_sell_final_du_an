/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .table('comment', (table) => {
      table.uuid('id_order').notNullable();
      table.dropColumn('id_user');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table('comment', (table) => {
      table.dropColumn('id_order');
    });
};
