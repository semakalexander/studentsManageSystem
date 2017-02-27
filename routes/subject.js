var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subject');
var Session = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var session = new Session();

    router.get('/getSubjectsByTeacher', session.isAuthenticatedTeacher, handler.getSubjectsByTeacher);
    router.get('/', session.isAuthenticatedStudent, handler.getAllSubjects);

    router.post('/subscribeTeacherOnSubject', session.isAuthenticatedAdmin, handler.subscribeTeacherOnSubject);
    router.post('/unsubscribeTeacherOnSubject', session.isAuthenticatedAdmin, handler.unsubscribeTeacherOnSubject);
    router.post('/', session.isAuthenticatedAdmin, handler.createSubject);

    router.patch('/:id', session.isAuthenticatedAdmin, handler.editSubjectById);

    router.delete('/:id', session.isAuthenticatedAdmin, handler.deleteSubjectById);

    return router;
};