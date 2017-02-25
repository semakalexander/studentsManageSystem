define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/groups/header.html'
], function ($, _, Backbone, headerTemplate) {
    var HeaderView = Backbone.View.extend({
        el: '#header',
        template: _.template(headerTemplate),
        events: {},
        initialize: function (options) {
            this.userCollection = options.userCollection;
            this.groupCollection = options.groupCollection;
            this.render();
        },
        render: function () {
            this.$el.html(this.template({groups: this.groupCollection.sort(name).toJSON()}));
        }
    });
    return HeaderView;
});
