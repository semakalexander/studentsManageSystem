var express = require('express');
var router = express.Router();
var Handler = require('../handlers/category');
var SessionHandler = require('../handlers/session');

module.exports = function (models) {
    var handler = new Handler(models);
    var sessionHandler = new SessionHandler();

    router.get('/', sessionHandler.isAuthenticatedStudent, handler.getAllCategories);
    router.post('/', sessionHandler.isAuthenticatedAdmin, handler.createCategory);
    router.patch('/:id', sessionHandler.isAuthenticatedAdmin, handler.editCategoryById);
    router.delete('/:id', sessionHandler.isAuthenticatedAdmin, handler.deleteCategoryById);

    return router;
};