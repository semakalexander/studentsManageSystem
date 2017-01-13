define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var CategoryModel = Backbone.Model.extend({
        urlRoot: 'categories/',
        idAttribute: '_id'
    });
    return CategoryModel;
});

