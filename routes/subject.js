var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subject');
var eSession = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getAllSubjects);
    router.post('/', handler.createSubject);
    router.patch('/:id', handler.editSubjectById);
    router.delete('/:id', handler.deleteSubjectById);

    return router;
};