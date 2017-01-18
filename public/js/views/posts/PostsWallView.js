define([
    'jquery',
    'underscore',
    'backbone',
    'collections/posts/posts',
    'text!templates/posts/postsWall.html'
], function ($, _, Backbone, PostCollection, postsWallTemplate) {
    var PostsWallView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(postsWallTemplate),
        collection: new PostCollection(),
        initialize: function (options) {
            this.posts=[];
            var self = this;
            this.collection.fetch({
                success: function () {
                    _.each(self.collection.models, function (post) {
                        var categories = post.get('categories');
                        _.each(categories, function (category) {
                            if(category.name == options.category){
                                self.posts.push(post.toJSON());
                            }
                        });
                    });
                    self.render();
                }
            });
        },
        render: function () {
            this.$el.html(this.template({posts: this.posts}));
        }
    });
    return PostsWallView;
});
