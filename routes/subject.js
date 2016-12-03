var express = require('express');
var router = express.router;
var Handler = require('../handlers/subject');
var eSession = require('../handlers/session');

exports.module = function (models) {
    var handler = new Handler(models);

    router.post('/create', eSession.authenticatedAdmin, handler.createSubject);
    router.patch('/edit/:id', eSession.authenticatedAdmin, handler.editSubjectById);
    router.delete('/delete/:id', eSession.authenticatedAdmin, handler.deleteSubjectById);

    return router;
};