define([
    'jquery',
    'underscore',
    'backbone',
    'collections/posts/posts',
    'text!templates/posts/profileList.html'
], function ($, _, Backbone, PostCollection, postListTemplate) {
    var PostListView = Backbone.View.extend({
        el: '#postListWrapper',
        template: _.template(postListTemplate),
        collection: new PostCollection(),
        initialize: function (options) {
            this.posts = options.posts;
            this.render();
        },
        render: function () {
            this.$el.html(this.template({posts: this.posts}));
        }
    });
    return PostListView;
});
