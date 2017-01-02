define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserModel, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#userListWrapper'),
        template: _.template(usersListTemplate),
        events: {},
        initialize: function (options) {
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
            });

            this.$('.btn-user-edit-cancel').on('click', function (e) {
                self.render();
            });
        },
        render: function (options) {
            var users = this.collection.toJSON();
            var userId = options ? options.userId : undefined;

            this.$el.html(this.template({users: users, userId: userId}));

            this.subscribeOnBtns();
            return this;
        }
    });
    return UsersListView;
});
