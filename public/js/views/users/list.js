define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users',
    'text!templates/users/list.html'
], function ($, _, Backbone, UserCollection, usersListTemplate) {
    var UsersListView = Backbone.View.extend({
        el: $('#container'),
        initialize: function () {
            this.collection = new UserCollection();
            this.collection.add({firstName: 'Alexander'});
            var compiledTemplate = _.template(usersListTemplate, {users: this.collection.models});
            this.el.html(compiledTemplate);
        },
        render: function () {
            var data = this.fetch();
            console.log(data);
            var compiledTemplate = _.template(usersListTemplate, {users: data});
            console.log('compiled  = '+ compiledTemplate);
            this.el.html(compiledTemplate);
        }
    });
    return UsersListView;
});