var express = require('express');
var router = express.Router();
var Handler = require('../handlers/category');
var Session = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var session = new Session();

    router.get('/', session.isAuthenticatedStudent, handler.getAllCategories);
    router.post('/', session.isAuthenticatedAdmin, handler.createCategory);
    router.patch('/:id', session.isAuthenticatedAdmin, handler.editCategoryById);
    router.delete('/:id', session.isAuthenticatedAdmin, handler.deleteCategoryById);

    return router;
};