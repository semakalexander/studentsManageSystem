define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/groups/courseList.html'
], function ($, _, Backbone, groupListTemplate) {
    var GroupListView = Backbone.View.extend({
        el: $('#groupList'),
        template: _.template(groupListTemplate),
        events: {},
        initialize: function (options) {
            this.userCollection = options.userCollection;
            this.groupCollection = options.groupCollection;
            this.groupCollection.bind('change', this.render, this);
            this.render();
        },
        render: function (options) {
            var groupId = options ? options.groupId : this.groupCollection.toJSON()[0]._id;
            var groups = this.groupCollection
                .search({_id: groupId})
                .toJSON();
            var users = groups.length ? groups[0].students : {};
            this.$el.html(this.template({users: users, add:false}));
        }
    });
    return GroupListView;
});
