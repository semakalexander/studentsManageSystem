define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'views/helpers/PaginationView',
    'text!templates/users/list.html',
    'jquery_ui'
], function ($, _, Backbone, UserModel, UserCollection, PaginationView, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: '#userListWrapper',
        template: _.template(usersListTemplate),
        paginationView: new PaginationView(),
        page: 1,
        perPage: 8,
        events: {
            "click .btn-user-edit": "onBtnUserEdit",
            "click .btn-user-edit-cancel": "onBtnUserEditCancel",
            "click .btn-user-edit-save": "onBtnUserEditSave",
            "click .btn-user-delete": "onBtnUserDelete",
            "click .pagination-link": "onPaginationLink"
        },
        initialize: function (options) {
            this.collection = options.collection;

            this.collection.bind('add', this.render, this);
            this.collection.bind('change', this.render, this);
        },
        onBtnUserEdit: function (e) {
            this.trigger('startEdit');
            var userId = $(e.target).closest('tr').data('id');
            this.render({userId: userId});
        },
        onBtnUserEditCancel: function () {
            this.trigger('endEdit');
            this.render();
        },
        onBtnUserEditSave: function (e) {
            var self = this;
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var $td = $target.closest('td');
            var userId = $tr.data('id');
            var user = this.collection.get(userId);
            var $inputs = $td.siblings('td').children('input');
            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                var value = $inputs[i]['value'].trim();
                if (value == '') {
                    alert('bad ' + $inputs[i]['name']);
                    return;
                }
                data[$inputs[i]['name']] = value;
            }

            user.save(data, {
                patch: true,
                success: function (model) {
                    self.collection.set(model, {remove: false});
                }
            });
            this.trigger('endEdit');
        },
        onBtnUserDelete: function (e) {
            var self = this;
            var userId = $(e.target).closest('tr').data('id');
            var user = self.collection.get(userId);

            user.destroy({
                success: function () {
                    if (self.collection.size() <= (self.page - 1) * self.perPage) {
                        self.page--;
                    }
                    self.render();
                    self.trigger('endEdit');
                }
            })
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
            this.trigger('endEdit');
        },
        largeTableRender: function () {
            this.$el.switchClass('col-md-9', 'col-md-12', 0);
        },
        middleTableRender: function () {
            this.$el.switchClass('col-md-12', 'col-md-9', 250);
        },
        render: function (options) {
            var users = this.collection.toJSON();
            var userId = options ? options.userId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({users: users.slice(start, start + this.perPage), userId: userId}));

            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(users.length / this.perPage)
            });
            return this;
        }
    });
    return UsersListView;
});
