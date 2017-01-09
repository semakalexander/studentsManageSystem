define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/groups/courseList.html'
], function ($, _, Backbone, addTemplate) {
    var CourseListView = Backbone.View.extend({
        el: $('#courseList'),
        template: _.template(addTemplate),
        events: {},
        initialize: function (options) {
            this.userCollection = options.userCollection;
            this.groupCollection = options.groupCollection;
            this.render();
        },
        subscribeOnAdd: function () {
            var self = this;
            this.$('.btn-add-to-group').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var userId = $tr.attr('data-id');
                var groupId = $('#groupSelect').val();


                $.ajax({
                    url: "/groups/addToGroup/",
                    method: "POST",
                    data: {
                        userId: userId,
                        groupId: groupId
                    }
                })
                    .done(function (user) {
                        alert('ok');
                    });

            })
        },
        render: function (options) {
            var course = options ? +options.course : 1;
            var selectedGroupId = options ? options.selectedGroupId : this.groupCollection.models[0].attributes['_id'];
            var users = this.userCollection
                .search({course: course, role: 'student'})
                .toJSON()
                .filter(function (user) {
                    return user.group != selectedGroupId;
                });
            //выдфыльтрувати шоб не виводило тих хто вже э в групы
            this.$el.html(this.template({users: users, add: true}));

            this.subscribeOnAdd();

        }
    });
    return CourseListView;
});
