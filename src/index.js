import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import schedule from 'node-schedule';
import winston from 'winston';

import container from 'src/services.js';
import Mailer from 'src/mailer.js';
import config from 'config.json';
import Server from 'src/server';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

const logger = winston;

logger.info('Launch paperboy');

const transport = nodemailer.createTransport(smtpTransport(config.smtp_config));
const mailer = new Mailer(transport);

const user = {
  email: config.user_email
};

schedule.scheduleJob('0 */1 * * *', () => {
    logger.info('fetch data job');
    container.engine.run();
});

// Server
Server(container.dataStore);
