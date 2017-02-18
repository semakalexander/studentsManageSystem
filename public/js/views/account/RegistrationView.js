define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/registration.html'
], function ($, _, Backbone, registrationTemplate) {
    var RegistrationView = Backbone.View.extend({
        el: "#container",
        template: _.template(registrationTemplate),
        events: {
            "click #btnRegister": "onBtnRegister"
        },
        initialize: function () {
            this.render();
        },
        onBtnRegister: function () {
            var $panel = this.$el.find('.panel-body');
            var email = $panel.find('#email')[0].value.trim();
            var password = $panel.find('#password')[0].value.trim();
            var firstName = $panel.find('#firstName')[0].value.trim();
            var lastName = $panel.find('#lastName')[0].value.trim();
            var course = $panel.find('#course')[0].value;
            var age = $panel.find('#age')[0].value;

            if ([email, password, firstName, lastName].indexOf('') > -1) {
                return alert('check fields');
            }
            $.ajax({
                url: "/account/registration",
                method: "POST",
                data: {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    login: firstName + ' ' + lastName,
                    course: course,
                    age: age
                },
                success: function () {
                    return Backbone.history.navigate('#', {trigger: true})
                },
                error: function (xhr) {
                    alert('Не найдено');
                    console.log(xhr);
                }
            });
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return RegistrationView;
});