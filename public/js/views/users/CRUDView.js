define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'views/users/AddView',
    'views/users/ListView',
    'text!templates/users/CRUD.html'
], function ($, _, Backbone, UserCollection, AddUserView, UserListView, CRUDTemplate) {
    var CRUDView = Backbone.View.extend({
        el: $('#container'),
        collection: new UserCollection(),
        template: _.template(CRUDTemplate),
        events: {},
        addUserView: new AddUserView(),
        listView: new UserListView(),
        initialize: function () {
            this.render();
            var self = this;
            this.addUserView.on('addNewUser', function () {
                self.listView.getUsersFromDB();
                self.listView.render();
            });
        },
        render: function () {
            this.$el.html(this.template());

            this.addUserView.$el = this.$('#addUserWrapper');
            this.addUserView.render();

            this.listView.$el = this.$('#userListWrapper');
            this.listView.getUsersFromDB();
            this.listView.render();
            return this;
        }
    });
    return CRUDView;
});
