import pug from 'pug';
import _ from 'lodash';
import moment from 'moment';

class Mailer {
  constructor(transport) {
    this.transport = transport;
  }

  _render(items) {
    items = _.groupBy(items, 'provider');
    const providers = _.keys(items);

    return pug.renderFile('template/mail.pug', {
      items: items,
      providers: providers
    });
  }

  sendReport(mail, items) {
    const html = this._render(items);

    const todayDate = moment().format('DD/MM');

    const mailOptions = {
      from: 'Paperboy',
      to: mail,
      subject: `Paperboy Report ${todayDate} ✔`,
      html: html
    };

    this.transport.sendMail(mailOptions, (error, info) => {
      if(error){
        throw error;
      }
    });
  }
}

export default Mailer;
