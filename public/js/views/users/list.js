define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(usersListTemplate),
        initialize: function () {
            var userCollection = new UserCollection();
            var self = this;
            userCollection.fetch({
                success: function (collection) {
                    self.collection = collection;
                    self.render();
                }
            });
        },
        render: function () {
            var compiledTemplate = this.template({users: this.collection.models});
            this.$el.html(compiledTemplate);
        }
    });
    return UsersListView;
});
