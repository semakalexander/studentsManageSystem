define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'views/users/AddView',
    'views/users/ListView',
    'text!templates/users/crud.html'
], function ($, _, Backbone, UserCollection, AddUserView, UserListView, CRUDTemplate) {
    var CRUDView = Backbone.View.extend({
        el: $('#container'),
        collection: new UserCollection(),
        template: _.template(CRUDTemplate),
        events: {},
        initialize: function () {
            this.render();


            var self = this;
            this.addView = new AddUserView({collection: this.collection});
            this.renderAdd();
            this.addView.on('addNewUser', function () {
                self.listView.getUsersFromDB();
                self.listView.render();
            });


            this.listView = new UserListView({collection: this.collection});
            this.renderList();
        },
        renderAdd: function () {
          this.addView.$el = this.$('#userAddWrapper');
          this.addView.render();
        },
        renderList: function () {
            this.listView.$el = this.$('#userListWrapper');
            this.listView.getUsersFromDB();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return CRUDView;
});
