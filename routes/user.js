var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var SessionHandler = require('../handlers/session.js');
var multipart = require('connect-multiparty');

module.exports = function (models) {
    var handler = new Handler(models);
    var multipartMiddleware = new multipart();
    var sessionHandler = new SessionHandler();

    router.get('/', sessionHandler.isAuthenticatedStudent, handler.getAllUsers);
    router.get('/:id', sessionHandler.isAuthenticatedStudent, handler.getUser);
    router.get('/marks', sessionHandler.isAuthenticatedStudent, handler.getMarks);
    router.get('/byCourse', sessionHandler.isAuthenticatedStudent, handler.getUsersByCourse);

    router.post('/', handler.createUser);
    router.post('/uploadProfilePhoto', sessionHandler.isAuthenticatedStudent, multipartMiddleware, handler.uploadProfilePhoto);

    router.patch('/subscribeOnTeacher', sessionHandler.isAuthenticatedStudent, handler.subscribeOnTeacher);
    router.patch('/resetNotificationsCount/:id', sessionHandler.isAuthenticatedStudent, handler.resetNewNotificationsCount);
    router.patch('/:id', sessionHandler.isAuthenticatedAdmin, handler.editUserById);

    router.delete('/:id', sessionHandler.isAuthenticatedAdmin, handler.deleteUserById);

    return router;
};
