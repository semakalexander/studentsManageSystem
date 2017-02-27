var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var Session = require('../handlers/session');

module.exports = function(app, models){
    var handler = new Handler(app, models);
    var session = new Session();

    router.get('/', session.isAuthenticatedStudent, handler.getAllPosts);
    
    router.post('/', session.isAuthenticatedTeacher, handler.createPost);

    // router.patch('/:id', session.isAuthenticatedTeacher, handler.editPostById);

    router.delete('/:id', session.isAuthenticatedTeacher, handler.deletePostById);

    router.post('/writeComment', session.isAuthenticatedStudent, handler.writeComment);

    return router;
};