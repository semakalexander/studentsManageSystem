define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'text!templates/marks/settings.html',
    'async'
], function ($, _, Backbone, SubjectCollection, settingsTemplate, async) {
    var MainView = Backbone.View.extend({
        el: $('#settingsMarks'),
        template: _.template(settingsTemplate),
        initialize: function (options) {
            this.groupCollection = options.groupCollection;
            var self = this;
            async.waterfall([
                this.getLoggedUser,
                this.getSubjects
            ], function (err, user, subjects) {
                if (err) {
                    return;
                }
                self.model = user;
                self.subjects = subjects;
                self.getGroups();
                self.render();
            });

        },
        getLoggedUser: function (callback) {
            $.ajax({
                url: '/account/getLoggedUser/',
                method: 'GET',
                success: function (user) {
                    callback(null, user);
                },
                error: function (err) {
                    callback(err);
                }
            });
        },
        getSubjects: function (user, callback) {
            $.ajax({
                url: '/subjects/getSubjectsByTeacher/',
                method: 'GET',
                data: {teacherId: user._id},
                success: function (teacherSubjects) {
                    var subjects = teacherSubjects.length ? teacherSubjects[0].subjects : [];
                    callback(null,user, subjects);
                },
                error: function (err) {
                    callback(err);
                }
            });
        },
        getGroups: function () {
            var self = this;
            var teacherGroups = _.filter(this.groupCollection.toJSON(), function (group) {
                return group.curator._id == self.model._id;
            });
            this.groups = teacherGroups.length ? teacherGroups : [];
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
