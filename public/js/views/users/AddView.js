define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/users/add.html'
], function ($, _, Backbone, AddTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(AddTemplate),
        events: {},
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        }
    });
    return AddView;
});
