// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const ENV = require('./config');

module.exports = {

  migrations: {
    directory: './pg/migrations',
  },
  seeds: {
    directory: './pg/seeds',
  },
  client: ENV.PG.DIALECT,
  connection: {
    host: ENV.PG.HOST,
    user: ENV.PG.USER,
    password: ENV.PG.PASSWORD,
    port: ENV.PG.PORT,
    database: ENV.PG.DATABASE,
  },

};
