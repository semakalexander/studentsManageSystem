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
        groupCollection: new GroupCollection(),
        userCollection: new UserCollection(),
        initialize: function () {
            var self = this;
            this.groupCollection.fetch({
                success: function () {
                    self.render();
                }
            });

        },
        afterSettingsRender: function () {
            var self = this;
            this.userCollection.fetch({
                success: function () {
                    self.marksOfGroupView = new MarksOfGroupView({
                        el :$('#listMarks'),
                        collection: self.userCollection
                    });
                    self.marksOfGroupView.render({
                        selectedGroup: this.$('#groupSelect')[0].value,
                        selectedSubject: this.$('#subjectSelect')[0].value,
                        selectedMonth: 'january'
                    });
                    self.$('#subjectSelect').on('change', function () {
                        var subject = self.settingsView.$('#subjectSelect')[0].value;
                        var month = self.settingsView.$('#monthSelect')[0].value;
                        self.marksOfGroupView.render({
                            selectedSubject: subject,
                            selectedMonth: month
                        })
                    });
                    self.settingsView.$('#monthSelect').on('change', this.func);
                }
            });
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
                el: $('#settingsMarks'),
                groupCollection: this.groupCollection
            });
            this.settingsView.bind('rendered', this.afterSettingsRender, this);
        }
    });
    return MainView;
});
