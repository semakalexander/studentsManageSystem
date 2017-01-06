define([
    'jquery',
    'underscore',
    'backbone',
    'collections/groups/groups',
    'collections/users/users',
    'views/groups/crud/AddView',
    'views/groups/crud/ListView',
    'text!templates/groups/crud/main.html'
], function ($, _, Backbone, GroupCollection, UserCollection, AddView, ListView, mainTemplate) {
    var CrudView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        groupCollection: new GroupCollection(),
        userCollection: new UserCollection(),
        events: {},
        initialize: function () {
            var self = this;
            this.groupCollection.fetch({
                success: function () {
                    self.userCollection.fetch({
                        success: function () {
                            self.render();
                        }
                    });
                }
            });
        },
        render: function () {
            this.$el.html(this.template());
            this.addView = new AddView({
                el: $('#groupAddWrapper'),
                groupCollection: this.groupCollection,
                userCollection: this.userCollection
            });
            this.listView = new ListView({
                el: $('#groupListWrapper'),
                groupCollection: this.groupCollection,
                userCollection: this.userCollection
            });
            var self = this;
            this.addView.on('addedNewGroup',function () {
                self.listView.getGroupsFromDb();
                alert('Success added!');
            });

        }
    });
    return CrudView;
})
;
