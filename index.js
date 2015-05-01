import DataStore from './src/datastore.js';
import Mailer from './src/mailer.js';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Twitter from './src/provider/twitter';
import config from './config.json';
import Knex from 'knex';
import schedule from 'node-schedule';

var twitter = new Twitter(config.twitter_config);

var knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  }
});

var dataStore = new DataStore(knex);
dataStore.init();
var transport = nodemailer.createTransport(smtpTransport(config.smtp_config));
var mailer = new Mailer(transport);

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
};

var sendMail = function() {
    dataStore.getNotSentItems().then((items) => {
        if (items.length > 0) {
            mailer.sendReport(config.user_email, items);
            dataStore.sendMessage();
        }
    });
};

schedule.scheduleJob('* */2 * * *', () => {
    console.log('Fetch Data');
    fetchData();
});

schedule.scheduleJob('30 8 * * *', () => {
    console.log('Send Report');
    sendMail();
});

