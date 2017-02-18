define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/logIn.html',
    'text!templates/helpers/alert.html'
], function ($, _, Backbone, LogInTemplate, AlertTemplate) {
    var LogInView = Backbone.View.extend({
        el: "#container",
        template: _.template(LogInTemplate),
        alertTemplate: _.template(AlertTemplate),
        events: {
            "click #btnLogIn": "onBtnLogIn",
            "click #btnForgotPasswordModal": "onBtnForgotPasswordModal",
            "click .modal-background": "onModalBackground",
            "click #btnForgotPasswordSubmit": "onBtnForgotPasswordSubmit"
        },
        initialize: function () {
            this.render();
        },
        onBtnLogIn: function () {
            var self = this;
            var email = this.$('#email')[0].value.trim();
            if (email == '') {
                alert('bad email');
                return;
            }
            var password = this.$('#password')[0].value.trim();
            if (password == '') {
                alert('bad password');
                return;
            }
            var rememberMe = this.$('#rememberMe')[0].value;
            $.ajax({
                url: "/account/logIn",
                method: "POST",
                data: {
                    email: email,
                    password: password,
                    rememberMe: rememberMe
                },
                success: function (xhr) {
                    if (xhr.role == 'teacher') {
                        return Backbone.history.navigate('#profiles/teacher', {trigger: true});
                    }
                    else {
                        return Backbone.history.navigate('#', {trigger: true})
                    }
                },
                error: function (xhr) {
                    self.$el.find('.alert').remove();
                    self.$el.find('.login-panel').before(self.alertTemplate({
                        type: 'danger',
                        message: xhr.responseText
                    }));
                }
            });
        },
        onBtnForgotPasswordModal: function () {
            var email = this.$el.find('#email').val();
            this.$el.find('#forgotPasswordEmail').val(email);
            this.$el.find('.modal-background').show();
            this.$el.find('.modal-background div').show();
        },
        onModalBackground: function (e) {
            if (e.target.className == 'modal-background' || e.target.className == 'btn-close') {
                this.$('.modal-background div').hide();
                this.$('.modal-background').hide();
            }
        },
        onBtnForgotPasswordSubmit: function () {
            var self = this;
            var email = this.$el.find('#forgotPasswordEmail')[0].value.trim();
            var $info;
            var $panel;
            var msg;
            var type;
            if (email == '') {
                return alert('Введіть email');
            }
            $info = this.$el.find('#info');
            $info.innerText = 'Зачекайте, виконується запит...';

            $panel = self.$el.find('.login-panel');
            this.$el.find('.alert').remove();

            $.ajax({
                url: "account/forgotPasswordSubmit",
                method: "GET",
                data: {
                    email: email
                },
                success: function () {
                    msg = 'Повідомлення надіслано. Перевірте свою пошту';
                    type = 'success';
                },
                error: function (xhr) {
                    msg = 'Повідомлення НЕ надіслано. ' + xhr.responseText;
                    type = 'danger';
                },
                complete: function () {
                    self.$('.modal-background div').hide();
                    self.$('.modal-background').hide();
                    $panel.before(self.alertTemplate({
                        type: type,
                        message: msg
                    }));
                }
            });
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return LogInView;
});