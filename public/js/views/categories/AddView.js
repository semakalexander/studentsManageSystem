define([
    'jquery',
    'underscore',
    'backbone',
    'models/category/category',
    'collections/categories/categories',
    'text!templates/categories/add.html'
], function ($, _, Backbone, CategoryModel, CategoryCollection, addCategoryTemplate) {
    var AddView = Backbone.View.extend({
        el: '#categoryAddWrapper',
        template: _.template(addCategoryTemplate),
        events: {
            "click #btnAddCategory": "onBtnAdd"
        },
        initialize: function () {
        },
        onBtnAdd: function (e) {
            e.preventDefault();
            var self = this;
            var $input = this.$el.find('#nameInput');
            var name = _.escape($input.val().trim());
            if (name == '') {
                alert('bad name');
                return;
            }

            var category = new CategoryModel({name: name});
            category.save({}, {
                success: function () {
                    self.trigger('addedNewCategory');
                    $input[0].value = '';
                }
            });
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});
