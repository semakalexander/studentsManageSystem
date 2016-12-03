var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subject');
var eSession = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getAllSubjects);
    router.post('/create', eSession.authenticatedAdmin, handler.createSubject);
    router.patch('/edit/:id', eSession.authenticatedAdmin, handler.editSubjectById);
    router.delete('/delete/:id', eSession.authenticatedAdmin, handler.deleteSubjectById);

    return router;
};