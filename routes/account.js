var express = require('express');
var router = express.Router();
var Handler = require('../handlers/account.js');
var UserHandler = require('../handlers/user');

var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);
    var userHandler = new UserHandler(models);

    router.get('/getLoggedUser', handler.getLoggedUser);
    router.get('/confirmWithEmailSubmit', handler.confirmWithEmailSubmit);
    router.delete('/confirmWithEmailAnswer', handler.confirmWithEmailAnswer);

    router.post('/logIn', handler.login);
    router.post('/registration', userHandler.createUser);

    router.patch('/changePassword/:id', handler.changePassword);

    router.delete('/logOut', handler.logOut);

    return router;
};
