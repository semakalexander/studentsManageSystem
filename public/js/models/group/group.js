define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var GroupModel = Backbone.Model.extend({
        urlRoot: 'groups/',
        idAttribute: '_id'
    });
    return GroupModel;
});

