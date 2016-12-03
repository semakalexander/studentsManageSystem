var express = require('express');
var router = express.router;
var Handler = require('../handlers/category');
var eSession = require('../handlers/session');

exports.module = function (models) {
    var handler = new Handler(models);

    router.post('/create', eSession.authenticatedAdmin, handler.createCategory());
    router.patch('/edit/:id', eSession.authenticatedAdmin, handler.editCategoryById());
    router.delete('/delete/:id', eSession.authenticatedAdmin, handler.deleteCategoryById());

    return router;
};