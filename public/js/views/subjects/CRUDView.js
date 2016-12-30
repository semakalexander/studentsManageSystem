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

        events: {},
        initialize: function () {
            this.render();
            this.addView = new AddView();
            this.listView = new ListView();
        },
        render: function () {
            this.$el.html(this.template());
            this.listView.$el = this.$('#subjectListWrapper');

            this.listView.getSubjectsFromDb();
            this.listView.render();

            this.addView.$el = this.$('#subjectAddWrapper');
            this.addView.render();


            return this;
        }
    });
    return CRUDView;
});
