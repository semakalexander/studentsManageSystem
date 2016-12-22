define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/home.html'
], function ($, _, Backbone, homeTemplate) {
    var HomeView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(homeTemplate),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        }
    });

    return HomeView;
});