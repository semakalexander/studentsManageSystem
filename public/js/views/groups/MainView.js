define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'collections/groups/groups',
    'views/groups/CourseListView',
    'views/groups/GroupListView',
    'views/groups/HeaderView',
    'text!templates/groups/main.html',
    'text!templates/groups/groupRow.html',
    'async'
], function ($, _, Backbone, UserCollection, GroupCollection, CourseListView, GroupListView,
             HeaderView, mainTemplate, groupRowTemplate, async) {
    var MainView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        userCollection: new UserCollection(),
        groupCollection: new GroupCollection(),
        events: {},
        initialize: function () {
            var self = this;

            async.parallel([
                function (cb) {
                    self.userCollection.fetch({
                        success: function () {
                           cb();
                        }
                    });
                },
                function (cb) {
                    self.groupCollection.fetch({
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
            this.headerView = new HeaderView({
                el: $('#header'),
                userCollection: this.userCollection,
                groupCollection: this.groupCollection
            });

            this.courseListView = new CourseListView({
                el: $('#courseList'),
                userCollection: this.userCollection,
                groupCollection: this.groupCollection
            });

            this.groupListView = new GroupListView({
                el: $('#groupList'),
                userCollection: this.userCollection,
                groupCollection: this.groupCollection
            });

            var self = this;
            this.headerView.$('#courseSelect').on('change', function () {
                self.courseListView.page = 1;
                self.courseListView.course = +this.value;
                self.courseListView.groupId = $('#groupSelect').val();
                self.courseListView.render();
            });
            this.headerView.$('#groupSelect').on('change', function () {
                self.groupListView.page = 1;
                self.groupListView.groupId = this.value;

                self.courseListView.course = +($('#courseSelect').val());
                self.courseListView.groupId = this.value;

                self.groupListView.render();
                self.courseListView.render();
            });


            this.courseListView.on('addToGroup', function (options) {
                options.tr.remove();
                alert('add');
                self.userCollection.fetch();
                self.groupCollection.fetch();
            });

            this.groupListView.on('deleteFromGroup', function (options) {
                options.tr.remove();
                alert('delete');
                self.userCollection.fetch();
                self.groupCollection.fetch();
            });


            this.userCollection.bind('change', this.courseListView.render, this.courseListView);
            this.groupCollection.bind('change', this.groupListView.render, this.groupListView);
        }
    });
    return MainView;
});
