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
        el: $('#userListWrapper'),
        template: _.template(usersListTemplate),
        events: {},
        page: 1,
        perPage: 8,
        initialize: function (options) {
            this.paginationView = new PaginationView();
            this.collection = options.collection;

            this.collection.bind('reset', this.render, this);
            this.collection.bind('change', this.render, this);
        },
        getUsersFromDB: function () {
            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset: true
            });
        },
        subscribeOnBtns: function () {
            var self = this;

            this.$('.btn-user-edit').on('click', function (e) {
                self.trigger('startEdit');
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var userId = $tr.attr('data-id');

                self.render({userId: userId});
            });

            this.$('.btn-user-delete').on('click', function (e) {
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var userId = $tr.attr('data-id');
                var user = self.collection.get(userId);

                user.destroy({
                    success: function () {
                        self.trigger('endEdit');
                        self.getUsersFromDB();

                    }
                })
            });

            this.$('.btn-user-edit-save').on('click', function (e) {
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                var userId = $tr.attr('data-id');
                var user = self.collection.get(userId);
                var $inputs = $td.siblings('td').children('input');
                var data = {};
                for (var i = 0, length = $inputs.length; i < length; i++) {
                    data[$inputs[i]['name']] = $inputs[i]['value'];
                }

                user.save(data, {patch: true});
                self.trigger('endEdit');
            });

            this.$('.btn-user-edit-cancel').on('click', function (e) {
                self.middleTableRender();
                self.render();
                self.trigger('endEdit');
            });

            this.$('.pagination-link').on('click', function (e) {
                e.preventDefault();
                self.page = $(e.target).data('page');
                self.render();
            });
        },
        largeTableRender:function () {
            this.$el.switchClass('col-md-9','col-md-12', 0);
        },
        middleTableRender:function () {
            this.$el.switchClass('col-md-12','col-md-9', 250);
        },
        render: function (options) {
            var users = this.collection.toJSON();
            var userId = options ? options.userId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({users: users.slice(start, start+ this.perPage), userId: userId}));

            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(users.length / this.perPage)
            });
            this.subscribeOnBtns();
            return this;
        }
    });
    return UsersListView;
});
