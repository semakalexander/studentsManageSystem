module.exports = function () {
    var self = this;
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


    this.sendEmail = function (mailOptions, cb) {
        var transport = nodemailer.createTransport(noReplay);

        transport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                if (cb && (typeof cb === 'function')) {
                    cb(err);
                }
            }
            else {
                console.log('Message sent to ' + response.accepted);
                if (cb && (typeof cb === 'function')) {
                    cb(null, response);
                }
            }
        });
    };

    this.sendEmailResetPassword = function (options, cb) {
        var mailOptions;
        var email = options.email;
        var link = 'http://localhost:3030/#account/forgot/' + options.id + '/' + options.key;

        mailOptions = {
            from: 'alexander_semak@gmail.com',
            to: email,
            subject: 'Forgot password?',
            generateTextFromHTML: true,
            html: 'Посилання на відновлення <a href="' + link + '">link</a>'
        };
        self.sendEmail(mailOptions, cb);
    };

    this.sendEmailConfirm = function (options, cb) {
        var mailOptions;
        var email = options.email;
        var id = options.id;
        var key = options.key;
        var link = 'http://localhost:3030/#account/confirm/' + id + '/' + key + '/' + email;

        mailOptions = {
            from: 'alexander_semak@gmail.com',
            to: email,
            subject: 'Реєстрація на сайті',
            generateTextFromHTML: true,
            html: 'Для підтвердження реєстрації перейдіть по <a href="' + link + '">посиланню</a>'
        };
        self.sendEmail(mailOptions, cb);
    };
};