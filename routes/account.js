var express = require('express');
var router = express.Router();
var Handler = require('../handlers/account.js');
var UserHandler = require('../handlers/user');

var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);
var userHandler = new UserHandler(models);

  	router.post('/logIn', handler.login);
    router.post('/registration', userHandler.createUser);
    router.post('/logOut', eSession.authenticatedUser, handler.logOut);
    router.get('/getLoggedUser', handler.getLoggedUser);

    return router;
};
