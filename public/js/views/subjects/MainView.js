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
            var self = this;
            this.collection.fetch({
                success: function () {
                    self.listView = new ListView({
                        $el: self.$('#subjectListWrapper'),
                        collection: self.collection
                    });
                    self.listView.render();

                    self.addView = new AddView({
                        $el: self.$('#subjectAddWrapper'),
                        collection: self.collection
                    });
                    self.addView.render();
                }
            });
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return CRUDView;
});
