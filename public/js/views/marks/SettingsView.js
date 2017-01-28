define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'text!templates/marks/settings.html'
], function ($, _, Backbone, SubjectCollection, settingsTemplate) {
    var MainView = Backbone.View.extend({
        el: $('#settingsMarks'),
        template: _.template(settingsTemplate),
        initialize: function (options) {
            this.groupCollection = options.groupCollection;
            this.getLoggedUser();
        },
        getLoggedUser: function () {
            var self = this;
            $.ajax({
                url: '/account/getLoggedUser/',
                method: 'GET',
                success: function (user) {
                    self.model = user;
                    self.getSubjects();
                }
            });
        },
        getSubjects: function () {
            var self = this;
            $.ajax({
                url: '/subjects/getSubjectsByTeacher/',
                method: 'POST',
                data: {teacherId: self.model._id},
                success: function (teacherSubjects) {
                    self.subjects = teacherSubjects.length ? teacherSubjects[0].subjects : [];
                    self.getGroups();
                }
            });
        },
        getGroups: function () {
            var self = this;
            var teacherGroups = _.filter(this.groupCollection.toJSON(), function (group) {
                return group.curator._id == self.model._id;
            });
            this.groups = teacherGroups.length ? teacherGroups : [];
            this.render();
        },
        render: function () {
            this.$el.html(this.template({
                subjects: this.subjects,
                groups: this.groups
            }));
            this.trigger('rendered');
        }
    });
    return MainView;
});
