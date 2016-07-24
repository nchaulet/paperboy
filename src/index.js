import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import schedule from 'node-schedule';
import winston from 'winston';

import container from 'src/services.js';
import Mailer from 'src/mailer.js';
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

var transport = nodemailer.createTransport(smtpTransport(config.smtp_config));
var mailer = new Mailer(transport);

var sendMailJob = new SendMailJob(container.dataStore, mailer, logger);
var user = {
  email: config.user_email
};

schedule.scheduleJob('0 */1 * * *', () => {
    logger.info('fetch data job');
    container.engine.run();
});

schedule.scheduleJob('30 8 * * *', () => {
    logger.info('send mail job');
    sendMailJob.process(user);
});

// Server
Server(container.dataStore);
