var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();
var fs = require('fs');

var Module = function (models) {
    var userModel = models.get('user', userSchema);


    this.getAllUsers = function (req, res, next) {
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

    this.getUsersByCourse = function (req, res, next) {
        var course = req.body.course;
        userModel.find({course: course}, function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);
        })
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
        body.role = body.role || 'student';
        var user = new userModel(body);

        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };

    this.uploadProfilePhoto = function (req, res, next) {
        var files = req.files;
        var id = req.session.userId;
        fs.readFile(files['profile_photo'].path, function (err, data) {
            if (err) {
                return next(err);
            }
            var fileName = 'images/profile_photos/' + id + '.png';
            fs.writeFile('public/' + fileName, data, function (err) {
                if (err) {
                    return next(err);
                }
                var data = {img:fileName};
                userModel.findOneAndUpdate({_id: id}, {$set: data}, {new: true}).exec(function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send(user);
                });
            });
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

};
module.exports = Module;
