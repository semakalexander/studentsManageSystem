define([
    'jquery',
    'underscore',
    'backbone',
    'models/category/category',
    'collections/categories/categories',
    'text!templates/categories/add.html'
], function ($, _, Backbone, CategoryModel, CategoryCollection, addCategoryTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#categoryAddWrapper'),
        template: _.template(addCategoryTemplate),
        events: {},
        initialize: function (options) {
            this.collection = options.collection;
        },
        subscribeOnAdd: function () {
            var self = this;
            this.$('#btnAddCategory').on('click', function (e) {
                e.preventDefault();
                var $input = $('#nameInput');
                var name = $input.val();

                var category = new CategoryModel({name: name});
                category.save();

                self.trigger('addedNewCategory');
                $input[0].value = '';
            });
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});
