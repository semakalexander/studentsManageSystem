define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/registration.html'
], function ($, _, Backbone, registrationTemplate) {
    var RegistrationView = Backbone.View.extend({
        el: $("#container"),
        template: _.template(registrationTemplate),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return RegistrationView;
});