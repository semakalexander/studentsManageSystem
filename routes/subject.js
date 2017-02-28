var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subject');
var SessionHandler = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var sessionHandler = new SessionHandler();

    router.get('/', sessionHandler.isAuthenticatedStudent, handler.getAllSubjects);
    router.get('/getSubjectsByTeacher', sessionHandler.isAuthenticatedTeacher, handler.getSubjectsByTeacher);

    router.post('/', sessionHandler.isAuthenticatedAdmin, handler.createSubject);

    router.patch('/subscribeTeacherOnSubject', sessionHandler.isAuthenticatedAdmin, handler.subscribeTeacherOnSubject);
    router.patch('/unsubscribeTeacherOnSubject', sessionHandler.isAuthenticatedAdmin, handler.unsubscribeTeacherOnSubject);
    router.patch('/:id', sessionHandler.isAuthenticatedAdmin, handler.editSubjectById);

    router.delete('/:id', sessionHandler.isAuthenticatedAdmin, handler.deleteSubjectById);

    return router;
};