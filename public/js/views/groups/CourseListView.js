define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/groups/courseList.html'
], function ($, _, Backbone, PaginationView, addTemplate) {
    var CourseListView = Backbone.View.extend({
        el: $('#courseList'),
        template: _.template(addTemplate),
        course: 1,
        groupId: null,
        page: 1,
        perPage: 8,
        paginationView: new PaginationView({linksQuantity: 5}),
        events: {
            "click .btn-add-to-group": "onBtnAddToGroup",
            "click .pagination-link": "onPaginationLink"
        },
        initialize: function (options) {
            this.userCollection = options.userCollection;
            this.groupCollection = options.groupCollection;
            this.render();
        },
        onBtnAddToGroup: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var userId = $tr.data('id');
            var groupId = $('#groupSelect').val();

            $.ajax({
                url: "/groups/addToGroup/",
                method: "POST",
                data: {
                    userId: userId,
                    groupId: groupId
                },
                success: function () {
                    self.trigger('addToGroup', {
                        tr: $tr
                    });
                },
                error: function (err) {
                    alert('something wrong');
                    console.log(err);
                }
            });
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
        },
        render: function () {
            var selectedGroupId = this.selectedGroupId || this.groupCollection.models[0].attributes['_id'];
            var users = this.userCollection
                .search({course: this.course, role: 'student'})
                .sort()
                .toJSON()
                .filter(function (user) {
                    return user.group != selectedGroupId;
                });

            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({users: users.slice(start, start + this.perPage), add: true}));

            this.paginationView.$el = this.$('#paginationCourse');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(users.length / this.perPage)
            });
        }
    });
    return CourseListView;
});
