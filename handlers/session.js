var mongoose = require('mongoose');

var userSchema = mongoose.Schema.User;
var userModel = models.get('user', userSchema);

var err;
var role;
var session = req.session;
var wasLogged = session && session.loggedIn && session.userId;

function authenticatedUser(req, res, next) {
    if (wasLogged) {
        next();
    }
    else {
        err = new Error('User is not auth');
        err.status = 401;
        next(err);
    }
}

function authenticatedTeacher(req, res, next) {
    userModel.findOne({_id: session.userId}, function (err, user) {
        if (err) {
            next(err);
        }
        role = user.role;
    });

    if (wasLogged && role == 'Teacher') {
        next();
    }
    else {
        err = new Error('Teacher is not auth');
        err.status = 401;
        next(err);
    }
}

function authenticatedAdmin(req, res, next) {
    userModel.findOne({_id: session.userId}, function (err, user) {
        if (err) {
            next(err);
        }
        role = user.role;
    });

    if(wasLogged && role == 'Admin'){
        next();
    }
    else{
        err = new Error('Admin is not auth');
        err.status = 401;
        next(err);
    }
}

exports.authenticatedUser = authenticatedUser;
exports.authenticatedTeacher = authenticatedTeacher;
exports.authenticatedAdmin = authenticatedAdmin;