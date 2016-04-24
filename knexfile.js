// Update with your config settings.

const config = require('./config.json');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: config.db_path
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: config.db_path
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
