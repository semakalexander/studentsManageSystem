var mongoose = require('mongoose');


var err;
var role;

function authenticatedUser(req, res, next) {
    var session = req.session;
    var wasLogged = session && session.loggedIn && session.userId;

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
    var session = req.session;
    var wasLogged = session && session.loggedIn && session.userId;


    if (wasLogged && session.role.toLowerCase() === 'teacher' ) {
        next();
    }
    else {
        err = new Error('Teacher is not auth');
        err.status = 401;
        next(err);
    }
}

function authenticatedAdmin(req, res, next) {
    var session = req.session;
    var wasLogged = session && session.loggedIn && session.userId;


    if(wasLogged && session.role.toLowerCase() === 'admin'){
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