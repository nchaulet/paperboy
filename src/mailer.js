import jade from 'jade';

class Mailer {
    constructor(transport) {
        this.transport = transport;
    }

    sendReport(mail, items) {
        var html = jade.renderFile('template/mail.jade', {
            items: items
        });

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
