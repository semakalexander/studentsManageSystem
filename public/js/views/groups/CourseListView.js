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

            this.render();
        },
        render: function (options) {
            var course = options ? +options.course : 1;
            var users = this.userCollection.search({course: course, role: 'student'}).toJSON();
            this.$el.html(this.template({users: users}));
        }
    });
    return CourseListView;
});
