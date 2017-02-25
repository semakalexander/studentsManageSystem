var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    var userModel = models.get('user', userSchema);

    this.logOut = function (req, res, next) {
        req.session.destroy();
        res.status(200).send();
    };

    this.login = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var shaSum = crypto.createHash('sha256');
        var session = req.session;

        userModel.findOne({email: email}, function (err, user) {
            if (err) {
                return next(err);
            }

            shaSum.update(password);

            if (!user || user.password !== shaSum.digest('hex')) {
                err = new Error("Bad email or password");
                err.status = 400;

                return next(err);
            }

            if (body.rememberMe === 'true') {
                session.rememberMe = true;
            }
            else {
                delete session.rememberMe;
                session.cookie.expires = false;
            }

            session.loggedIn = true;
            session.userId = user._id;
            session.userName = user.firstName + ' ' + user.lastName;
            session.role = user.role;
            res.status(200).send(user);
        });

    };

    this.registration = function (req, res, next) {
        var user = new userModel(req.body);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };

    this.forgotPasswordSubmit = function (req, res, next) {
        var query = req.query;
        if (typeof query.email === 'undefined') {
            return next(new Error('should be email'));
        }
        var email = query.email;

        userModel.findOne({email: email}, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('В базі даних немає такого email'));
            }

            mailer.sendEmail({
                email: email,
                id: user.id,
                key: user.password
            });
            res.status(200).send();
        });
    };

    this.forgotPasswordAnswer = function (req, res, next) {
        var query = req.query;
        var id = query.id;
        var key = query.key;
        userModel.findById(id, function (err, user) {
            if (err) {
                return next(err);
            }
            if (user.password !== key) {
                err = new Error('Invalid key');
                return next(err);
            }
            res.status(200).send();
        });
    };

    this.getLoggedUser = function (req, res, next) {
        var id = req.session.userId;
        userModel
            .findById(id)
            .populate('marks subjects notifications.elements')
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (user != null) {
                    res.status(200).send(user);
                }
                else {
                    res.status(200).send();
                }
            });
    };

    this.changePassword = function (req, res, next) {
        var id = req.params.id;
        var password = req.body.password;
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        userModel
            .findOneAndUpdate({_id: id}, {$set: {password: shaSum.digest('hex')}})
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(user);
            });
    };

};

module.exports = Module;