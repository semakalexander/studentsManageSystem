define([
    'jquery',
    'underscore',
    'backbone',
    'models/post/post',
    'text!templates/posts/add.html'
], function ($, _, Backbone, PostModel, addPostTemplate) {
    var AddPostView = Backbone.View.extend({
        el: $('#addPostWrapper'),
        template: _.template(addPostTemplate),
        initialize: function (options) {
            this.collection = options.categoryCollection;
        },
        subscribeOnBtns: function () {
            var self = this;

            this.$('#btnAddNewPost').on('click', function (e) {
                e.preventDefault();
                var $title = $('#title');
                var $categories = $('#categories');
                var $content = $('#content');

                var title = $title.val();
                var categories = $categories.val();
                var content = $content.val();

                var post = new PostModel({
                    title:title,
                    categories:categories,
                    content:content
                });

                post.save();

                self.trigger('addedNewPost');
                $title.val('');
                $categories.val('');
                $content.val('');
            });
        },
        render: function () {
            this.$el.html(this.template({categories:this.collection.toJSON()}));

            this.subscribeOnBtns();
        }
    });
    return AddPostView;
});
