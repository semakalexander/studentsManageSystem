var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var eSession = require('../handlers/session');

module.exports = function(models){
    var handler = new Handler(models);

    router.get('/', handler.getAllPosts);
    
    router.post('/create',eSession.authenticatedTeacher, handler.createPost);

    router.patch('/edit/:id', eSession.authenticatedTeacher, handler.editPostById);

    router.delete('/delete/:id', eSession.authenticatedTeacher, handler.deletePostById);


    return router;
};