define([
    'jquery',
    'underscore',
    'backbone',
    'collections/categories/categories',
    'views/categories/AddView',
    'views/categories/ListView',
    'text!templates/categories/main.html'
], function ($, _, Backbone, CategoryCollection, AddView, ListView, mainTemplate) {
    var MainView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        collection: new CategoryCollection(),
        initialize: function () {
            this.render();

            this.addView = new AddView({collection: this.collection});
            this.renderAdd();
            this.addView.subscribeOnAdd();
            var self = this;
            this.addView.on('addedNewCategory', function () {
                self.listView.getCategoriesFromDb();
            });

            this.listView = new ListView({collection: this.collection});
            this.renderList();
        },
        renderList: function () {
            this.listView.$el = this.$('#categoryListWrapper');
            this.listView.getCategoriesFromDb();
        },
        renderAdd: function () {
            this.addView.$el = this.$('#categoryAddWrapper');
            this.addView.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return MainView;
});
