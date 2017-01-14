define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var PostModel = Backbone.Model.extend({
        urlRoot: 'posts/',
        idAttribute: '_id'
    });
    return PostModel;
});

