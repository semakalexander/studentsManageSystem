var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var eSession = require('../handlers/session.js');
var multipart = require('connect-multiparty');

module.exports = function (models) {
    var handler = new Handler(models);
    var multipartMiddleware = new multipart();

    router.get('/', handler.getAllUsers);
    router.get('/marks', handler.getMarks);
    router.get('/byCourse', handler.getUsersByCourse);

    router.post('/', handler.createUser);
    router.post('/uploadProfilePhoto', multipartMiddleware, handler.uploadProfilePhoto);
    router.patch('/:id', handler.editUserById);
    router.delete('/:id', handler.deleteUserById);

    return router;
};
