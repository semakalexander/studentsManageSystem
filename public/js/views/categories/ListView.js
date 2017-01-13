define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/categories/list.html'
], function ($, _, Backbone, PaginationView, listCategoriesTemplate) {
    var ListView = Backbone.View.extend({
        el: $('#categoryListWrapper'),
        template: _.template(listCategoriesTemplate),
        page: 1,
        perPage: 8,
        initialize: function (options) {
            this.paginationView = new PaginationView();
            this.collection = options.collection;

            this.collection.bind('reset', this.render, this);
            this.collection.bind('change', this.render, this);
        },
        getCategoriesFromDb: function (options) {
            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset: true
            });
        },
        subscribeOnEditBtns: function () {
            var self = this;

            this.$('.btn-category-edit').on('click', function (e) {
                var $tr = $(e.target).closest('tr');

                var id = $tr.attr('data-id');
                self.render({categoryId: id});
            });

            this.$('.btn-category-delete').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var id = $tr.attr('data-id');
                var user = self.collection.get({_id: id});
                user.destroy({
                    success: function () {
                        $tr.remove();
                    }
                });
            });

            this.$('.btn-category-edit-save').on('click', function (e) {
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                var categoryId = $tr.attr('data-id');
                var category = self.collection.get(categoryId);
                var $inputs = $td.siblings('td').children('input');

                var data = {};
                for (var i = 0, length = $inputs.length; i < length; i++) {
                    data[$inputs[i]['name']] = $inputs[i]['value'];
                }

                category.save(data, {patch: true});
            });

            this.$('.btn-category-edit-cancel').on('click', function () {
                self.render();
            });

            this.$('.pagination-link').on('click', function (e) {
                e.preventDefault();
                self.page = $(e.target).data('page');
                self.render();
            });
        },
        render: function (options) {
            var categories = this.collection.toJSON();
            var categoryId = options ? options.categoryId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({categories: categories.slice(start, start + this.perPage), categoryId: categoryId}));

            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(categories.length / this.perPage)
            });

            this.subscribeOnEditBtns();
            return this;
        }
    });
    return ListView;
});
