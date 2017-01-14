var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var eSession = require('../handlers/session');

module.exports = function(models){
    var handler = new Handler(models);

    router.get('/', handler.getAllPosts);
    
    router.post('/', handler.createPost);

    router.patch('/:id',  handler.editPostById);

    router.delete('/:id', handler.deletePostById);


    return router;
};