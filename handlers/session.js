function authenticatedUser(req, res, next) {
    var err;
    if (req.session && req.session.loggedIn && req.session.userId) {
        next();
    }
    else {
        err = new Error('User is not auth');
        err.status = 401;
        next(err);
    }
}

exports.authenticatedUser = authenticatedUser;