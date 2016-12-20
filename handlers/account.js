var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
	var userModel = models.get('user', userSchema);

	//middleware
	this.checkRegisterFields = function (req, res, next) {
			var err;
			var body = req.body;
			var email = body.email;
			var password = body.password;
			var firstName = body.firstName;
			var lastName = body.lastName;
			var course = body.course;
			var age = body.age;
			var group = body.group;

			if (!email.length || !password.length || !firstName.length || !lastName.length) {
					err = new Error('Empty email or password or name');
					err.status = 400;
					return next(err);
			}

			var shaSum = crypto.createHash('sha256');
			shaSum.update(password);
			body.password = shaSum.digest('hex');

			next();
	};
	//
	this.logOut = function (req, res, next) {
			req.session.destroy();
			res.status(200).send('Done');
	};

	this.login = function (req, res, next) {
			var body = req.body;
			var email = body.email;
			var password = body.password;
			var shaSum = crypto.createHash('sha256');
			var session = req.session;
			var err;

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

	this.forgotPassword = function (req, res, next) {
			res.status(200).send('ok');
			mailer.sendEmail({email: '00110111@mail.ua', id: req.session.userId});
	};


};

module.exports = Module;