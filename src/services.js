import DataStore from 'src/datastore.js';
import Knex from 'knex';
import config from 'config.json';

const container = {};

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: config.db_path
  }
});

const dataStore = new DataStore(knex);
container.dataStore = dataStore;

export default container;
