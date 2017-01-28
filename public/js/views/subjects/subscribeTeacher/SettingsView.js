define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/subjects/subscribeTeacher/settings.html'
], function ($, _, Backbone, settingsTemplate) {
    var SettingsView = Backbone.View.extend({
        el: $('#settings'),
        template: _.template(settingsTemplate),
        initialize: function (options) {
            this.collection = options.userCollection;
            this.render();
        },
        subscribeOnEvents: function () {
            var self = this;
            $('#teacherSelect').on('change', function () {
                self.teacherId = this.value;
                self.trigger('teacherChange');
            });
        },
        render: function () {
            var teachers = this.collection.search({role: 'teacher'}).toJSON();
            this.$el.html(this.template({teachers: teachers}));
            this.subscribeOnEvents();
        }
    });
    return SettingsView;
});
