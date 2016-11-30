var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', eSession.authenticatedUser, handler.getUsers);
    router.get('/logOut', eSession.authenticatedUser, handler.logOut);

    router.post('/login', handler.login);
 //   router.post('/createUser', handler.createUser);
    router.post('/registration', handler.checkRegisterFields, handler.register);



    router.delete('/deleteUser/:id', handler.deleteUserById);

    return router;
};