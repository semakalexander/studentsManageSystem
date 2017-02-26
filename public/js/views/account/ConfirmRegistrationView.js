define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/confirmRegistration.html',
    'text!templates/helpers/alert.html'
], function ($, _, Backbone, ConfirmRegistrationTemplate, AlertTemplate) {
    var ConfirmRegistrationView = Backbone.View.extend({
        el: "#container",
        template: _.template(ConfirmRegistrationTemplate),
        alertTemplate: _.template(AlertTemplate),
        events: {
            "click #btnRegister": "onBtnRegister"
        },
        initialize: function (options) {
            var self = this;
            this.email = options.email;
            $.ajax({
                url: "account/confirmWithEmailAnswer",
                method: "DELETE",
                data: {
                    id: options.id,
                    key: options.key,
                    type: 'confirm email'
                },
                success: function () {
                    self.render();
                }
            });
        },
        onBtnRegister: function () {
            var self = this;
            var $panel = this.$el.find('.panel');
            var $panelBody = $panel.find('.panel-body');
            var email = this.email;
            var password = $panelBody.find('#password')[0].value.trim();
            var firstName = $panelBody.find('#firstName')[0].value.trim();
            var lastName = $panelBody.find('#lastName')[0].value.trim();
            var course = $panelBody.find('#course')[0].value;
            var age = $panelBody.find('#age')[0].value;

            if ([password, firstName, lastName].indexOf('') > -1) {
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
                    $panel.before(self.alertTemplate({
                        type: 'success',
                        message: 'Ви успішно зареєструвались. Через 5 секунд ви будете перенаправлені на головну сторінку.'
                    }));
                    setTimeout(function () {
                        return Backbone.history.navigate('#', {trigger: true})
                    }, 5000);
                },
                error: function (xhr) {
                    alert('error');
                    console.log(xhr);
                }
            });
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return ConfirmRegistrationView;
});