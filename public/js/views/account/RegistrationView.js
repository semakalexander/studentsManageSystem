define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/registration.html',
    'text!templates/helpers/alert.html'
], function ($, _, Backbone, RegistrationTemplate, AlertTemplate) {
    var RegistrationView = Backbone.View.extend({
        el: "#container",
        template: _.template(RegistrationTemplate),
        alertTemplate: _.template(AlertTemplate),
        events: {
            "click #btnRegister": "onBtnRegister"
        },
        initialize: function () {
            this.render();
        },
        onBtnRegister: function () {
            var self = this;
            var $panel = this.$el.find('.panel');
            var $panelBody = $panel.find('.panel-body');
            var email = $panelBody.find('#email')[0].value.trim();
            $.ajax({
                url: "account/confirmWithEmailSubmit",
                method: "GET",
                data: {
                    email: email,
                    type: 'confirm email'
                },
                success: function () {
                    $panel.before(self.alertTemplate({
                        type: 'success',
                        message: 'Ми вислали листа вам на пошту. Для закінчення реєстрації перейдіть за посиланням у листі.'
                    }));
                },
                error: function (xhr) {
                    $panel.before(self.alertTemplate({
                        type: 'error',
                        message: xhr
                    }));
                }
            });
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return RegistrationView;
});