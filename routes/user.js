var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getUsers);
    router.get('/marks', eSession.authenticatedUser, handler.getMarks);

    router.post('/createUser',eSession.authenticatedAdmin, handler.createUser);
    router.patch('/editUser/:id', eSession.authenticatedAdmin, handler.editUserById);
    router.delete('/deleteUser/:id', eSession.authenticatedAdmin, handler.deleteUserById);

    return router;
};
