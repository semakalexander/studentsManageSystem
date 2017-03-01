define([
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    'collections/posts/posts',
    'text!templates/posts/postsWall.html',
    'text!templates/posts/comment.html'
], function ($, _, Backbone, io, PostCollection, postsWallTemplate, commentTemplate) {
    var PostsWallView = Backbone.View.extend({
        el: '#container',
        template: _.template(postsWallTemplate),
        collection: new PostCollection(),
        events: {
            "click .btn-add-comment": "onBtnAddComment",
            "click #btn-posts-subscribe": "onBtnPostsSubscribe"
        },
        initialize: function (options) {
            var self = this;
            this.posts = [];
            this.collection.fetch({
                success: function () {
                    if (options) {
                        if (options.category) {
                            self.collection = self.collection.sort();
                            self.posts = self.collection.filterByCategory(options.category)
                        }
                        else if (options.author) {
                            self.author = options.author;
                            self.posts = self.collection.filterByAuthor(options.author).sort().toJSON();
                        }
                    } else {
                        self.posts = self.collection.toJSON();
                    }
                    self.render();
                }
            });
        },
        onBtnAddComment: function (e) {
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
                    content: content,
                    dateOfCreation: new Date()
                },
                success: function (comment) {
                    var template = _.template(commentTemplate);
                    $post.find('.comments').append(template({comment: comment}));
                    $text.val('');
                }
            });
        },
        onBtnPostsSubscribe: function (e) {
            var $btn = $(e.target);
            var author = $btn.data('id');
            $.ajax({
                url: "users/subscribeOnTeacher",
                method: "PATCH",
                data: {
                    teacherLogin: author
                },
                success: function (xhr) {
                    alert('profit');
                },
                error: function (xhr) {
                    alert('error');
                    console.log(xhr)
                }
            });
        },
        render: function () {
            this.$el.html(this.template({
                author: this.author,
                posts: this.posts
            }));
        }
    });
    return PostsWallView;
});
