define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'collections/users/users',
    'views/subjects/subscribeTeacher/SettingsView',
    'views/subjects/subscribeTeacher/SubscribeOnView',
    'views/subjects/subscribeTeacher/SubscribeOffView',
    'text!templates/subjects/subscribeTeacher/main.html'
], function ($, _, Backbone, SubjectCollection, UserCollection, SettingView, SubscribeOnView, SubscribeOffView, mainTemplate) {
    var MainView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(mainTemplate),
        userCollection: new UserCollection(),
        subjectCollection: new SubjectCollection(),
        initialize: function () {
            var self = this;
            this.render();
            this.userCollection.fetch({
                success: function () {
                    self.subjectCollection.fetch({
                        success: function () {
                            self.subscribeOnListView = new SubscribeOnView({
                                el: $('#subscribeOn'),
                                collection: self.subjectCollection
                            });
                            self.subscribeOffListView = new SubscribeOffView({
                                el: $('#subscribeOff'),
                                collection: self.subjectCollection
                            });

                            self.settingsView = new SettingView({
                                el: $('#settings'),
                                userCollection: self.userCollection
                            });

                            self.renderLists();


                            self.subscribeOffListView.on('subjectSubscribed', function () {
                                self.subscribeOffListView.render();
                                self.subscribeOnListView.render();
                            });
                            self.subscribeOnListView.on('subjectUnsubscribed', function () {
                                self.subscribeOffListView.render();
                                self.subscribeOnListView.render();
                            });
                            self.listenTo(self.settingsView, 'teacherChange', self.renderLists);
                        }
                    });

                }
            });
        },
        renderLists: function () {
            this.subscribeOnListView.page = 1;
            this.subscribeOffListView.page = 1;
            this.subscribeOnListView.render();
            this.subscribeOffListView.render();
        },
        render: function () {
            this.$el.html(this.template());
        }
    });
    return MainView;
});
