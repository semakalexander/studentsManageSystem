define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account/login.html'
], function ($, _, Backbone, loginTemplate) {
    var LoginView = Backbone.View.extend({
        el: $("#container"),
        template: _.template(loginTemplate),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template)
        }
    });
    return LoginView;
});