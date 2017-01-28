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
            this.posts = [];
            var self = this;
            if (options.category || options.author) {
                this.collection.fetch({
                    success: function () {
                        if (options.category) {
                            _.each(self.collection.models, function (post) {
                                var categories = post.get('categories');
                                _.each(categories, function (category) {
                                    if (category.name == options.category) {
                                        self.posts.push(post.toJSON());
                                    }
                                });
                            });
                        }
                        else if (options.author) {
                            self.posts = self.collection.filterByAuthor(options.author).toJSON();
                        }
                        self.render();

                    }
                });
            }
        },
        render: function () {
            this.$el.html(this.template({posts: this.posts}));
        }
    });
    return PostsWallView;
});
