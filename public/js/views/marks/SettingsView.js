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
            $.ajax({
                url: '/groups/getGroupsByTeacher/',
                method: 'POST',
                data: {teacherId: self.model._id},
                success: function (teacherGroups) {
                    self.groups = teacherGroups.length ? teacherGroups[0].groups : [];
                    self.render();
                }
            });
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
