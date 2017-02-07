define([
    'jquery',
    'underscore',
    'backbone',
    'collections/posts/posts',
    'text!templates/posts/postsWall.html',
    'text!templates/posts/comment.html'
], function ($, _, Backbone, PostCollection, postsWallTemplate, commentTemplate) {
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
                            self.collection = self.collection.sort();
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
                            self.posts = self.collection.filterByAuthor(options.author).sort().toJSON();
                        }
                        self.render();
                    }
                });
            }
        },
        render: function () {
            this.$el.html(this.template({posts: this.posts}));

            this.$('.btn-add-comment').on('click', function (e) {
                var $btn = $(e.target);
                var $post = $btn.closest('.blog-post');
                var $text = $btn.siblings('textarea');

                var content = $text.val();
                var postId = $post.data('id');

                $.ajax({
                    url: "/posts/writeComment/",
                    method: "POST",
                    data: {
                        postId: postId,
                        content: content
                    },
                    success: function (comment) {
                        var template = _.template(commentTemplate);
                        $post.find('.comments').append(template({comment: comment}));
                        $text.val('');
                    }
                });

            });
        }
    });
    return PostsWallView;
});
