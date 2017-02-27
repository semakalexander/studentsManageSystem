var express = require('express');
var router = express.Router();
var Handler = require('../handlers/marks');
var Session = require('../handlers/session');

module.exports = function(models){
    var handler = new Handler(models);
    var session = new Session();

    router.get('/', handler.getAllMarks());

    router.post('/', handler.createMark);

    router.patch('/:id',  handler.editMarkyById());

    router.delete('/:id', handler.deleteMarkById());

    return router;
};