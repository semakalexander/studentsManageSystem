define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/profiles/profileInfo.html'
], function ($, _, Backbone, profileInfoTemplate) {
    var ProfileInfoView = Backbone.View.extend({
        el: $('#profileInfoWrapper'),
        template: _.template(profileInfoTemplate),
        initialize: function (options) {
            this.user = options.user;
        },
        render: function () {
            this.$el.html(this.template({user: this.user}));
        }
    });
    return ProfileInfoView;
});
