var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    var userModel = models.get('user', userSchema);

    //get


    this.getUsers = function (req, res, next) {
        userModel.find({}, function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);
        });
        // var session = req.session;
        // var groupId;
        // userModel.findOne({_id: session.userId}, function (err, user) {
        //     if (err) {
        //         return next(err);
        //     }
        //     groupId = user.group;
        // });
        // userModel.find({group: groupId}, function (err, users) {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.status(200).send(users);
        //
        // });
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




    //end get

    //post


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
    //end adminkade
    //end post

    //delete
    //end delete
};
module.exports = Module;
