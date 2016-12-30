define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'text!templates/subjects/list.html'
], function ($, _, Backbone, SubjectCollection, listSubjectsTemplate) {
    var ListView = Backbone.View.extend({
        el: $('#subjectListWrapper'),
        template: _.template(listSubjectsTemplate),
        collection: new SubjectCollection(),
        events: {},
        initialize: function () {
            this.collection.bind('reset', this.render, this);
        },
        getSubjectsFromDb: function () {
            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset: true
            });
        },
        render: function () {
            var subjects = this.collection.toJSON();
            this.$el.html(this.template({subjects: subjects}));
        }
    });
    return ListView;
});
