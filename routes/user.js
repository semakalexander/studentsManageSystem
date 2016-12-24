var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var eSession = require('../handlers/session.js');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getAllUsers);
    router.get('/marks', handler.getMarks);

    router.post('/createUser', handler.createUser);
    router.patch('/:id', handler.editUserById);
    router.delete('/:id', handler.deleteUserById);

    return router;
};
