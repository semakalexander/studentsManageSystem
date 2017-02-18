define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/resetPassword.html',
    'text!templates/helpers/alert.html'
], function ($, _, Backbone, ResetPasswordTemplate, AlertTemplate) {
    var ResetPasswordView = Backbone.View.extend({
        el: "#container",
        template: _.template(ResetPasswordTemplate),
        alertTemplate: _.template(AlertTemplate),
        events: {
            "click #btnResetPassword": "onBtnResetPassword"
        },
        initialize: function (options) {
            var self = this;
            this.id = options.id;
            $.ajax({
                url: "account/forgotPasswordAnswer",
                method: "GET",
                data: {
                    id: options.id,
                    key: options.key
                },
                success: function () {
                    self.render();
                },
                error: function (xhr) {
                    self.renderError(xhr.responseText);
                }
            });
        },
        onBtnResetPassword: function () {
            var self = this;
            var password = this.$el.find('#password')[0].value;
            var passwordConfirm = this.$el.find('#passwordConfirm')[0].value;
            if (password !== passwordConfirm) {
                return alert('check password');
            }
            $.ajax({
                url: "account/changePassword/" + self.id,
                method: "PATCH",
                data: {
                    password: password
                },
                success: function (xhr) {
                    $.ajax({
                        url: "/account/logIn",
                        method: "POST",
                        data: {
                            email: xhr.email,
                            password: password,
                            rememberMe: true
                        },
                        success: function (xhr) {
                            self.$el.find('.panel').before(self.alertTemplate({
                                type: 'success',
                                message: 'Пароль змінено. Через 5 секунд ви будете перенаправлені на головну сторінку.'
                            }));

                            setTimeout(function () {
                                if (xhr.role == 'teacher') {
                                    return Backbone.history.navigate('#profiles/teacher', {trigger: true});
                                }
                                else {
                                    return Backbone.history.navigate('#', {trigger: true})
                                }
                            }, 5000);
                        }
                    });
                },
                error: function (xhr) {
                    self.renderError(xhr.responseText);
                }
            });
        },
        renderError: function (message) {
            this.$el.html(this.alertTemplate({
                type: 'danger',
                message: message
            }));
        },
        render: function () {
            this.$el.html(this.template());
        }
    });
    return ResetPasswordView;
});
