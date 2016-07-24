import DataStore from 'src/datastore.js';
import Knex from 'knex';
import config from 'config.json';
import TwitterProvider from 'src/provider/twitter';
import GithubProvider from 'src/provider/github';
import Engine from 'src/engine';

const container = {};

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: config.db_path
  }
});

const dataStore = new DataStore(knex);
container.dataStore = dataStore;

const engine = new Engine(container.dataStore);

engine.addProvider(new TwitterProvider(config.twitter_config));
engine.addProvider(new GithubProvider(config.github_config));

container.engine = engine;

export default container;
