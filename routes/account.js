var express = require('express');
var router = express.Router();
var Handler = require('../handlers/account.js');
var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);

  	router.post('/login', handler.login);
    router.post('/registration', handler.checkRegisterFields, handler.registration);
    router.get('/logOut', eSession.authenticatedUser, handler.logOut);
    router.get('/getLoggedUser', handler.getLoggedUser);

    return router;
};
