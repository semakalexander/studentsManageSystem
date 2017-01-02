define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'views/subjects/AddView',
    'views/subjects/ListView',
    'text!templates/subjects/crud.html'
], function ($, _, Backbone, SubjectCollection, AddView, ListView, crudTemplate) {
    var CRUDView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(crudTemplate),
        collection: new SubjectCollection(),
        events: {},
        initialize: function () {
            this.render();

            this.addView = new AddView({collection: this.collection});
            this.renderAdd();
            this.addView.subscribeOnAdd();
            var self = this;
            this.addView.on('addedNewSubject', function () {
                self.listView.getSubjectsFromDb();
            });

            this.listView = new ListView({collection: this.collection});
            this.renderList();

        },
        renderList: function () {
            this.listView.$el = this.$('#subjectListWrapper');
            this.listView.getSubjectsFromDb();
        },
        renderAdd: function () {
            this.addView.$el = this.$('#subjectAddWrapper');
            this.addView.render();
        },
        render: function () {
            this.$el.html(this.template());


            return this;
        }
    });
    return CRUDView;
});
