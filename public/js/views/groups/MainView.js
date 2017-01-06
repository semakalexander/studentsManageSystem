define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'collections/groups/groups',
    'views/groups/CourseListView',
    'views/groups/GroupListView',
    'views/groups/HeaderView',
    'text!templates/groups/main.html'
], function ($, _, Backbone, UserCollection, GroupCollection, CourseListView, GroupListView, HeaderView, mainTemplate) {
    var MainView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        userCollection: new UserCollection(),
        groupCollection: new GroupCollection(),
        events: {},
        initialize: function () {
            var self = this;
            this.userCollection.fetch({
                success: function () {
                    self.groupCollection.fetch({
                        success: function () {
                            self.render();
                        }
                    });
                }
            });
        },
        render: function () {
            this.$el.html(this.template());
            this.headerView = new HeaderView({
                el: $('#header'),
                userCollection: this.userCollection,
                groupCollection: this.groupCollection
            });

            this.courseListView = new CourseListView({
                el: $('#courseList'),
                userCollection: this.userCollection
            });

            this.groupListView = new GroupListView({
                el: $('#groupList'),
                userCollection: this.userCollection,
                groupCollection: this.groupCollection
            });
            
            var self = this;
            this.headerView.$('#courseSelect').on('change', function () {
                var course = this.value;
                self.courseListView.render({course: course});
            });
            this.headerView.$('#groupSelect').on('change', function () {
                var groupName = this.value;
                self.groupListView.render({groupName: groupName});
            });
        }
    });
    return MainView;
});
