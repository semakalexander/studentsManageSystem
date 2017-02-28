var express = require('express');
var router = express.Router();
var Handler = require('../handlers/account.js');
var UserHandler = require('../handlers/user');
var SessionHandler = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);
    var userHandler = new UserHandler(models);
    var sessionHandler = new SessionHandler();

    router.get('/getLoggedUser', sessionHandler.isAuthenticatedStudent, handler.getLoggedUser);

    router.post('/logIn', handler.login);
    router.post('/registration', userHandler.createUser);
    router.post('/confirmWithEmailSubmit', handler.confirmWithEmailSubmit);

    router.patch('/changePassword/:id', handler.changePassword);

    router.delete('/logOut', sessionHandler.isAuthenticatedStudent, handler.logOut);
    router.delete('/confirmWithEmailAnswer', handler.confirmWithEmailAnswer);


    return router;
};
