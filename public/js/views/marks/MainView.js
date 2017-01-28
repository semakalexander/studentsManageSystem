define([
    'jquery',
    'underscore',
    'backbone',
    'collections/groups/groups',
    'collections/subjects/subjects',
    'collections/users/users',
    'views/marks/MarksOfGroup',
    'views/marks/SettingsView',
    'text!templates/marks/main.html'
], function ($, _, Backbone, GroupCollection, SubjectCollection, UserCollection, MarksOfGroupView, SettingsView, mainTemplate) {
    var MainView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        initialize: function () {
            this.render();
            this.marksOfGroupView = new MarksOfGroupView();
            this.marksOfGroupView.$el = $('#listMarks');
        },
        subscribeOnSelects: function () {
            this.marksOfGroupView.render({
                selectedSubject: this.$('#subjectSelect').value,
                selectedMonth: 'january'
            });
            var self = this;
            this.$('#subjectSelect').on('change', function () {
                var subject = self.settingsView.$('#subjectSelect').value;
                var month = self.settingsView.$('#monthSelect').value;
                self.marksOfGroupView.render({
                    selectedSubject: subject,
                    selectedMonth: month
                })
            });
            this.settingsView.$('#monthSelect').on('change', this.func);
        },
        func: function () {
            var subject = this.settingsView.$('#subjectSelect').value;
            var month = this.settingsView.$('#monthSelect').value;
            this.marksOfGroupView.render({
                selectedSubject: subject,
                selectedMonth: month
            })
        },
        render: function () {
            this.$el.html(this.template());
            this.settingsView = new SettingsView({
                el: $('#settingsMarks')
            });
            this.settingsView.bind('rendered', this.subscribeOnSelects, this);


        }
    });
    return MainView;
});
