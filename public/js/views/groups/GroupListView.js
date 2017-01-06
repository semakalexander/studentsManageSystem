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
            this.render();
        },
        render: function (options) {
            var groupName = options ? options.groupName : '';
            var groups = this.groupCollection.search({name: groupName});
            var users = groups.models.length ? groups.models[0].students.toJSON() : {};
            this.$el.html(this.template({users: users}));
        }
    });
    return GroupListView;
});
