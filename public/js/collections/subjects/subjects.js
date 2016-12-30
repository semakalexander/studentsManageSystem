define([
    'underscore',
    'backbone',
    'models/subject/subject'
], function (_, Backbone, SubjectModel) {
    var SubjectCollection = Backbone.Collection.extend({
        model: SubjectModel ,
        url: '/subjects/'
    });
    return SubjectCollection;
});