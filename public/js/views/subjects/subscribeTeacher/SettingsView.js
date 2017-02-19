define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/subjects/subscribeTeacher/settings.html'
], function ($, _, Backbone, settingsTemplate) {
    var SettingsView = Backbone.View.extend({
        el: '#settings',
        template: _.template(settingsTemplate),
        events:{
            "change #teacherSelect": "onTeacherSelect"
        },
        initialize: function (options) {
            this.collection = options.userCollection;
            this.render();
        },
        onTeacherSelect: function (e) {
            this.teacherId = $(e.target)[0].value;
            this.trigger('teacherChange');
        },
        render: function () {
            var teachers = this.collection.search({role: 'teacher'}).toJSON();
            this.$el.html(this.template({teachers: teachers}));
        }
    });
    return SettingsView;
});
