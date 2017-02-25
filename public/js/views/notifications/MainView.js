define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'text!templates/notifications/notifications.html'
], function ($, _, Backbone, UserModel, notificationsTemplate) {
    var MainView = Backbone.View.extend({
        el: '#container',
        template: _.template(notificationsTemplate),
        events: {},
        initialize: function () {
            var self = this;
            $.ajax({
                url: "account/getLoggedUser",
                method: "GET",
                success: function (xhr) {
                    self.model = new UserModel({_id: xhr._id});
                    self.model.fetch({
                        success: function () {
                            var notifications = self.model.get('notifications');
                            var elements = notifications.elements;
                            var newCount = notifications.newCount;
                            elements = elements.sort(function (a, b) {
                                return new Date(b.dateOfCreation) - new Date(a.dateOfCreation);
                            });

                            self.render({
                                notifications: {
                                    new: elements.slice(0, newCount),
                                    old: elements.slice(newCount, elements.length)
                                }
                            });

                            $.ajax({
                                url: "users/resetNotificationsCount/" + self.model.get('_id'),
                                method: "PATCH",
                                success: function (xhr) {
                                    $('#notifications-count').html('');
                                },
                                error: function (xhr) {
                                    console.log(xhr);
                                }
                            });

                        }
                    });

                }
            });
        },
        render: function (options) {
            this.$el.html(this.template(options));
        }
    });
    return MainView;
});
