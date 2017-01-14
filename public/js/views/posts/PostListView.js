define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/posts/list.html'
], function ($, _, Backbone, postListTemplate) {
    var PostListView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(postListTemplate),
        initialize: function (options) {
            this.posts = options.posts;
        },
        render: function () {
            this.$el.html(this.template({posts:this.posts}));
        }
    });
    return PostListView;
});
