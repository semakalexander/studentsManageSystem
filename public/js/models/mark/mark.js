define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var MarkModel = Backbone.Model.extend({
        urlRoot: 'marks/',
        idAttribute: '_id'
    });
    return MarkModel;
});

