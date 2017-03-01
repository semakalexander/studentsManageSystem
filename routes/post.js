var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var SessionHandler = require('../handlers/session');

module.exports = function(app, models){
    var handler = new Handler(app, models);
    var sessionHandler = new SessionHandler();

    router.get('/', sessionHandler.isAuthenticatedStudent, handler.getAllPosts);
    
    router.post('/', sessionHandler.isAuthenticatedStudent, handler.createPost);
    router.post('/writeComment', sessionHandler.isAuthenticatedStudent, handler.writeComment);

    router.delete('/:id', sessionHandler.isAuthenticatedTeacher, handler.deletePostById);

    return router;
};