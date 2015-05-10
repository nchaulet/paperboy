import jade from 'jade';
import _ from 'lodash';

class Mailer {
    constructor(transport) {
        this.transport = transport;
    }

    _render(items) {
        items = _.groupBy(items, 'provider');
        var providers = _.keys(items);

        return jade.renderFile('template/mail.jade', {
            items: items,
            providers: providers
        });
    }

    sendReport(mail, items) {
        var html = this._render(items);

        var mailOptions = {
            from: 'Paperboy',
            to: mail,
            subject: 'Paperboy Report ✔',
            html: html
        };

        this.transport.sendMail(mailOptions, function(error, info){
            if(error){
                throw error;
            }
        });
    }
}

export default Mailer;
