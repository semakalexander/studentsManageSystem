module.exports = function () {
    var nodemailer = require('nodemailer');

    var noReplay = {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: false,
        auth: {
            user: 'semak.alexander@gmail.com',
            pass: 'lx00110111'
        },
        tls: {rejectUnauthorized: false}
    };

    this.sendEmail = function (options, cb) {
        var mailOptions;
        var email = options.email;
        var link = 'http://localhost:3030/#account/forgot/' + options.id + '/' + options.key;

        mailOptions = {
            from: 'sfder@gmail.com',
            to: email,
            subject: 'Forgot password?',
            generateTextFromHTML: true,
            html: 'Посилання на відновлення <a href="' + link + '">link</a>'
        };

        var transport = nodemailer.createTransport(noReplay);

        transport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                if (cb && (typeof cb === 'function')) {
                    cb(err);
                }
            }
            else {
                console.log('Message sent: ' + response.message);
                if (cb && (typeof cb === 'function')) {
                    cb(null, response);
                }
            }
        });
    }
};