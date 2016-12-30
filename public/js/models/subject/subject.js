define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var subjectModel = Backbone.Model.extend({
        idAttribute: '_id'
    });
    return subjectModel;
});

