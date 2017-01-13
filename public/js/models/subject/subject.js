define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var SubjectModel = Backbone.Model.extend({
        urlRoot: 'subjects/',
        idAttribute: '_id'
    });
    return SubjectModel;
});

