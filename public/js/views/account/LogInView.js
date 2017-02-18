define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/logIn.html'
], function ($, _, Backbone, logInTemplate) {
    var LogInView = Backbone.View.extend({
        el: "#container",
        template: _.template(logInTemplate),
        events: {
            "click #btnLogIn": "onBtnLogIn"
        },
        initialize: function () {
            this.render();
        },
        onBtnLogIn: function () {
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
                    alert('Не найдено');
                }
            });
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return LogInView;
});