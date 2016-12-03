var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;

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

    //get
    this.getUsers = function (req, res, next) {
        var session = req.session;
        var groupId;
        userModel.findOne({_id: session.userId}, function (err, user) {
            if (err) {
                return next(err);
            }
            groupId = user.group;
        });
        userModel.find({group: groupId}, function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);

        });
    };

    this.getMarks = function (req, res, next) {
        var session = req.session;
        userModel.findOne({_id: session.userId}, function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user.marks);
        });
    };

    this.logOut = function (req, res, next) {
        req.session.destroy();
        res.status(200).send('Done');
    };


    //end get

    //post

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


    //adminka
    this.createUser = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;


        var shaSum = crypto.createHash('sha256');
        var err;

        if (!email.length || !password.length || !firstName.length || !lastName.length) {
            err = new Error('Empty email or password or name');
            err.status = 400;
            return next(err);
        }
        shaSum.update(password);
        body.password = shaSum.digest('hex');
        var user = new userModel(body);


        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };

    this.editUserById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        userModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    this.deleteUserById = function (req, res, next) {
        userModel.remove({_id: req.params.id}).exec(
            function (err, resp) {
                if (err) {
                    next(err);
                }

                res.status(200).send(resp);
            }
        )
    };
    //end adminka
    //end post

    //delete
    //end delete
};
module.exports = Module;