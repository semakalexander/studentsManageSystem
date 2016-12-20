define([
    'jquery',
    'underscore',
    'backbone',
    '../../collections/users/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(usersListTemplate),
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

        render: function () {
            var compiledTemplate = this.template({users: this.collection.models});

            this.$el.html(compiledTemplate);
        }
    });
    return UsersListView;
});
