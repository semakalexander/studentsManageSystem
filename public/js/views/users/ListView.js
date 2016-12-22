define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(usersListTemplate),
        events:{
            'click .btn-delete': 'onBtnDeleteUser'
        },
        initialize: function () {
            this.collection = new UserCollection();
            this.collection.bind('reset', this.render, this);
        },
        getUserFromDB: function () {
            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset:true
            });
        },
        onBtnDeleteUser: function (e) {
          var $target =  $(e.target);
          var $tr = $target.closest('tr');
          var userId = $tr.attr('id');
          var user = this.collection.get(userId);

        },
        render: function () {
            var users = this.collection.toJSON();
            var compiledTemplate = this.template({users: users});

            this.$el.html(compiledTemplate);
        }
    });
    return UsersListView;
});
