var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var Session = require('../handlers/session.js');
var multipart = require('connect-multiparty');

module.exports = function (models) {
    var handler = new Handler(models);
    var multipartMiddleware = new multipart();
    var session = new Session();

    router.get('/', session.isAuthenticatedStudent, handler.getAllUsers);
    router.get('/:id', session.isAuthenticatedStudent, handler.getUser);
    router.get('/marks', session.isAuthenticatedStudent, handler.getMarks);
    router.get('/byCourse', session.isAuthenticatedStudent, handler.getUsersByCourse);

    router.post('/', handler.createUser);
    router.post('/uploadProfilePhoto', session.isAuthenticatedStudent, multipartMiddleware, handler.uploadProfilePhoto);

    router.patch('/subscribeOnTeacher', session.isAuthenticatedStudent, handler.subscribeOnTeacher);
    router.patch('/resetNotificationsCount/:id', session.isAuthenticatedStudent, handler.resetNewNotificationsCount);
    router.patch('/:id', session.isAuthenticatedAdmin, handler.editUserById);

    router.delete('/:id', session.isAuthenticatedAdmin, handler.deleteUserById);

    return router;
};
