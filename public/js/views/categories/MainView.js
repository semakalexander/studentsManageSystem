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
        el: '#container',
        template: _.template(mainTemplate),
        collection: new CategoryCollection(),
        initialize: function () {
            var self = this;
            this.render();

            this.addView = new AddView({
                el:'#categoryAddWrapper'
            });
            this.addView.render();
            this.addView.on('addedNewCategory', function () {
                self.listView.getCategoriesFromDb();
            });

            this.listView = new ListView({
                el: '#categoryListWrapper',
                collection: this.collection
            });
            this.listView.getCategoriesFromDb();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return MainView;
});
