var express = require('express');
var router = express.Router();
var Handler = require('../handlers/group');
var eSession = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);

     router.get('/', handler.getAllGroups);

    router.post('/:groupId/addUser/:userId', handler.addUserToGroup);
    router.post('/create', eSession.authenticatedAdmin, handler.createGroup);
    router.patch('/edit/:id', eSession.authenticatedAdmin, handler.editGroupById);
    router.delete('/delete/:id', eSession.authenticatedAdmin, handler.deleteGroupById);

    return router;
};