class SendMailJob {
  constructor(dataStore, mailer, logger) {
    this.dataStore = dataStore;
    this.mailer    = mailer;
    this.logger    = logger;
  }

  process(user) {
    this.dataStore.getNotSentItems().then((items) => {
      if (items.length > 0) {
        this.logger.info('Send mail : ' + items.length + 'items');
        this.mailer.sendReport(user.email, items);
        this.dataStore.sendMessages();
      }
    });
  }
}

export default SendMailJob;
