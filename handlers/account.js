var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var confirmKeySchema = mongoose.Schemas.ConfirmKey;

var Mailer = require('../helpers/mailer');

var Module = function (models) {
    var userModel = models.get('user', userSchema);
    var confirmKeyModel = models.get('confirmKey', confirmKeySchema);

    var mailer = new Mailer();

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

    this.confirmWithEmailSubmit = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var type = body.type;
        var key = Math.random().toString(36).substr(2, 36);

        var confirmKey = new confirmKeyModel({
            email: email,
            key: key,
            type: type
        });
        confirmKey.save(function (err, model) {
            if (err) {
                return next(err);
            }
            var options = {
                email: email,
                id: model._id,
                key: key
            };
            if (type === 'reset password') {
                mailer.sendEmailResetPassword(options);
            } else if (type === 'confirm email') {
                mailer.sendEmailConfirm(options);
            }
            res.status(200).send();
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


    this.logOut = function (req, res, next) {
        req.session.destroy();
        res.status(200).send();
    };

    this.confirmWithEmailAnswer = function (req, res, next) {
        var body = req.body;
        var id = body.id;
        var key = body.key;
        var type = body.type;

        confirmKeyModel
            .findOneAndRemove({_id: id, key: key, type: type}, function (err, doc, result) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error('Невірний код'));
                }

                res.status(200).send(result);
            });
    };
};

module.exports = Module;