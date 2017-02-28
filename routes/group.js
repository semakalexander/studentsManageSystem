var express = require('express');
var router = express.Router();
var Handler = require('../handlers/group');
var SessionHandler = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var sessionHandler = new SessionHandler();

    router.get('/', sessionHandler.isAuthenticatedTeacher, handler.getAllGroups);
    router.get('/getGroupsByTeacher', sessionHandler.isAuthenticatedTeacher, handler.getGroupsByTeacher);

    router.post('/', sessionHandler.isAuthenticatedAdmin, handler.createGroup);
    router.post('/addToGroup', sessionHandler.isAuthenticatedTeacher, handler.addUserToGroup);

    router.patch('/:id', sessionHandler.isAuthenticatedAdmin, handler.editGroupById);

    router.delete('/deleteFromGroup', sessionHandler.isAuthenticatedTeacher, handler.deleteUserFromGroup);
    router.delete('/:id', sessionHandler.isAuthenticatedAdmin, handler.deleteGroupById);

    return router;
};
