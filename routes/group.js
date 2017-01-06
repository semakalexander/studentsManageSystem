var express = require('express');
var router = express.Router();
var Handler = require('../handlers/group');
var eSession = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getAllGroups);

    router.post('/:groupId/addUser/:userId',  handler.addUserToGroup);
    router.post('/', handler.createGroup);

    router.patch('/:id',handler.editGroupById);
    router.delete('/:id', handler.deleteGroupById);

    return router;
};
