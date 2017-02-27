var express = require('express');
var router = express.Router();
var Handler = require('../handlers/group');
var Session = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var session = new Session();

    router.get('/getGroupsByTeacher', session.isAuthenticatedTeacher, handler.getGroupsByTeacher);
    router.get('/', session.isAuthenticatedTeacher, handler.getAllGroups);

    router.post('/addToGroup', session.isAuthenticatedTeacher, handler.addUserToGroup);
    router.post('/', session.isAuthenticatedAdmin, handler.createGroup);

    router.patch('/:id', session.isAuthenticatedAdmin, handler.editGroupById);

    router.delete('/:id', session.isAuthenticatedAdmin, handler.deleteGroupById);
    router.delete('/deleteFromGroup', session.isAuthenticatedTeacher, handler.deleteUserFromGroup);

    return router;
};
