import DataStore from './src/datastore.js';
import Mailer from './src/mailer.js';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import TwitterProvider from './src/provider/twitter';
import GithubProvider from './src/provider/github';
import config from './config.json';
import Knex from 'knex';
import schedule from 'node-schedule';
import winston from 'winston';
import GitHubApi from 'github';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

winston.info('Launch paperboy');

var logger = winston;

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


var twitter = new TwitterProvider(config.twitter_config);
var github = new GithubProvider(config.github_config);

var fetchData = function() {
    twitter.getData().then(function(tweets) {
        tweets.forEach((tweet) => {
            dataStore.getItem(tweet.id, 'twitter').then((item) => {
                if (!item) {
                    dataStore.createItem(tweet.id, 'twitter', tweet);
                }
            });
        });
    });

    github.getData().then((repos) => {
        repos.forEach((repo) => {
            dataStore.getItem(repo.id, 'github').then((item) => {
                if (!item) {
                    dataStore.createItem(repo.id, 'github', repo);
                }
            });
        });
    });
};

var sendMail = function() {
    dataStore.getNotSentItems().then((items) => {
        if (items.length > 0) {
            mailer.sendReport(config.user_email, items);
        }
    });
};

schedule.scheduleJob('0 */2 * * *', () => {
    logger.info('Fetch Data');
    fetchData();
});

schedule.scheduleJob('30 8 * * *', () => {
    logger.info('Send report');
    sendMail();
});

