define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var subjectModel = Backbone.Model.extend({
        urlRoot: 'subjects/',
        idAttribute: '_id'
    });
    return subjectModel;
});

