define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'views/users/AddView',
    'views/users/ListView',
    'text!templates/users/crud.html'
], function ($, _, Backbone, UserCollection, AddUserView, UserListView, CRUDTemplate) {
    var MainView = Backbone.View.extend({
        el: '#container',
        collection: new UserCollection(),
        template: _.template(CRUDTemplate),
        events: {},
        initialize: function () {
            var self = this;
            this.collection.fetch({
                success: function () {
                    self.addView = new AddUserView({
                        $el: self.$('#userAddWrapper'),
                        collection: self.collection
                    });
                    self.addView.render();


                    self.listView = new UserListView({
                        $el: self.$('#userListWrapper'),
                        collection: self.collection
                    });
                    self.listView.render();


                    self.listView.on('startEdit', function () {
                        self.addView.hide();
                        self.listView.largeTableRender();
                    });

                    self.listView.on('endEdit', function () {
                        self.listView.middleTableRender();
                        self.addView.show();

                    });
                }
            });
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return MainView;
});
