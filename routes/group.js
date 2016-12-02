var express = require('express');
var router = express.router;
var Handler = require('../handlers/group');
var eSession = require('../handlers/session');

exports.module = function (models) {
    var handler = new Handler(models);

    router.post('/create', eSession.authenticatedAdmin, handler.createGroup);
    router.post('/edit/:id', eSession.authenticatedAdmin, handler.editGroupById);
    router.post('/delete/:id', eSession.authenticatedAdmin, handler.deleteGroupById);

    return router;
};