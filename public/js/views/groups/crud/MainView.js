define([
    'jquery',
    'underscore',
    'backbone',
    'async',
    'collections/groups/groups',
    'collections/users/users',
    'views/groups/crud/AddView',
    'views/groups/crud/ListView',
    'text!templates/groups/crud/main.html'
], function ($, _, Backbone, async, GroupCollection, UserCollection, AddView, ListView, mainTemplate) {
    var CrudView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        groupCollection: new GroupCollection(),
        userCollection: new UserCollection(),
        events: {},
        initialize: function () {
            var self = this;
            async.parallel([
                function (cb) {
                    self.groupCollection.fetch({
                        success: function () {
                            cb();
                        }
                    });
                },
                function (cb) {
                    self.userCollection.fetch({
                        success: function () {
                            cb();
                        }
                    });
                }
            ], function (err) {
                if(err){
                    return;
                }
                self.render();
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
            this.addView.on('addedNewGroup', function () {
                self.listView.getGroupsFromDb();
                alert('Success added!');
            });

        }
    });
    return CrudView;
});
