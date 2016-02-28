import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Knex from 'knex';
import schedule from 'node-schedule';
import winston from 'winston';

import DataStore from 'src/datastore.js';
import Mailer from 'src/mailer.js';
import TwitterProvider from 'src/provider/twitter';
import GithubProvider from 'src/provider/github';
import Engine from 'src/engine';
import config from 'config.json';
import SendMailJob from 'src/jobs/sendmailjob';
import Server from 'src/server';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

var logger = winston;

logger.info('Launch paperboy');

var knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: config.db_path
  }
});

var dataStore = new DataStore(knex);
dataStore.init();
var transport = nodemailer.createTransport(smtpTransport(config.smtp_config));
var mailer = new Mailer(transport);

var engine = new Engine(dataStore);

engine.addProvider(new TwitterProvider(config.twitter_config));
engine.addProvider(new GithubProvider(config.github_config));

var sendMailJob = new SendMailJob(dataStore, mailer, logger);
var user = {
  email: config.user_email
};

schedule.scheduleJob('0 */1 * * *', () => {
    logger.info('fetch data job');
    engine.run();
});

schedule.scheduleJob('30 8 * * *', () => {
    logger.info('send mail job');
    sendMailJob.process(user);
});

// Server
Server(dataStore);
