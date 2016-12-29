define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserModel, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(usersListTemplate),
        events: {
            'click .btn-delete': 'onBtnDeleteUser',
            'click .btn-edit': 'onBtnEditUser',
            'click .btn-edit-cancel': 'onBtnEditCancel',
            'click .btn-edit-save': 'onBtnEditSave'
        },
        initialize: function () {
            this.collection = new UserCollection();
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
        onBtnDeleteUser: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var userId = $tr.attr('id');
            var user = this.collection.get(userId);
            var self = this;
            user.destroy({
                success: function () {
                    self.getUsersFromDB();
                    self.render();
                }
            })
        },
        onBtnEditUser: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var userId = $tr.attr('id');
            var user = this.collection.get(userId).toJSON();
            this.render(user);
        },
        onBtnEditCancel: function () {
            this.render();
        },
        onBtnEditSave: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var $td = $target.closest('td');
            var userId = $tr.attr('id');
            var user = this.collection.get(userId);
            var $inputs = $td.siblings('td').children('input');
            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                data[$inputs[i]['className']] = $inputs[i]['value'];
            }

            user.save(data, {patch: true});
        },
        render: function (model) {
            var users = this.collection.toJSON();
            var compiledTemplate = this.template({users: users, model: model});

            this.$el.html(compiledTemplate);
            return this;
        }
    });
    return UsersListView;
});
