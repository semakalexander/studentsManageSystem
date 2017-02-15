define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/categories/list.html'
], function ($, _, Backbone, PaginationView, listCategoriesTemplate) {
    var ListView = Backbone.View.extend({
        el: '#categoryListWrapper',
        template: _.template(listCategoriesTemplate),
        page: 1,
        perPage: 8,
        events:{
            "click .btn-category-edit": "onBtnEdit",
            "click .btn-category-delete": "onBtnDelete",
            "click .btn-category-edit-save": "onBtnEditSave",
            "click .btn-category-edit-cancel": "onBtnEditCancel",
            "click .pagination-link" : "onPaginationLink"
        },
        initialize: function (options) {
            this.paginationView = new PaginationView();
            this.collection = options.collection;

            this.collection.bind('reset', this.render, this);
        },
        getCategoriesFromDb: function () {
            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset: true
            });
        },
        onBtnEdit: function (e) {
            e.preventDefault();
            var id = $(e.target).closest('tr').data('id');
            this.render({categoryId: id});
        },
        onBtnDelete:function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var id = $tr.data('id');
            var category = this.collection.get({_id: id});
            category.destroy({
                success: function () {
                    if(self.collection.size() <= (self.page -1) * self.perPage){
                        self.page--;
                    }
                    self.render();
                }
            });
        },
        onBtnEditSave: function (e) {
            var self = this;

            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var categoryId = $tr.attr('data-id');
            var category = this.collection.get(categoryId);
            var $inputs = $target
                .closest('td')
                .siblings('td')
                .children('input');

            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                var val = $inputs[i]['value'].trim();
                if(val == ''){
                    alert('bad '+$inputs[i]['name']+ ', man. bad');
                    return;
                }
                data[$inputs[i]['name']] = val;
            }

            category.save(data, {
                patch: true,
                success: function (model) {
                    self.collection.set(model, {remove:false});
                    self.render();
                }
            });
        },
        onBtnEditCancel: function () {
            this.render();
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
        },
        render: function (options) {
            var categories = this.collection.toJSON();
            var categoryId = options ? options.categoryId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({
                categories: categories.slice(start, start + this.perPage),
                categoryId: categoryId
            }));

            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(categories.length / this.perPage)
            });

            return this;
        }
    });
    return ListView;
});
