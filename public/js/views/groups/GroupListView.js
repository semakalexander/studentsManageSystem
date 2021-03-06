define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/groups/courseList.html'
], function ($, _, Backbone, PaginationView, groupListTemplate) {
    var GroupListView = Backbone.View.extend({
        el: '#groupList',
        template: _.template(groupListTemplate),
        groupId: null,
        page: 1,
        perPage: 8,
        paginationView: new PaginationView({linksQuantity: 7}),
        events: {
            "click .btn-delete-from-group": "onBtnDeleteFromGroup",
            "click .pagination-link": "onPaginationLink"
        },
        initialize: function (options) {
            this.userCollection = options.userCollection;
            this.groupCollection = options.groupCollection;

            this.groupId = this.groupCollection.toJSON()[0]._id;
            this.render();
        },
        onBtnDeleteFromGroup: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var userId = $tr.attr('data-id');

            $.ajax({
                url: "/groups/deleteFromGroup",
                method: "DELETE",
                data: {
                    userId: userId,
                    groupId: self.groupId
                },
                success: function () {
                    self.trigger('deleteFromGroup', {
                        tr: $tr
                    });
                }
            });
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
        },
        render: function () {
            var group = this.groupCollection
                .get(this.groupId)
                .toJSON();
            var users = group ? group.students : {};

            var start = (this.page - 1) * this.perPage;
            this.$el.html(this.template({users: users.slice(start, start + this.perPage), add: false}));

            this.paginationView.$el = this.$('#paginationGroup');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(users.length / this.perPage)
            });

        }
    });
    return GroupListView;
});
