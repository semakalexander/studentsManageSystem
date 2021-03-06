define([
    'jquery',
    'underscore',
    'backbone',
    'models/post/post',
    'text!templates/posts/add.html'
], function ($, _, Backbone, PostModel, addPostTemplate) {
    var AddPostView = Backbone.View.extend({
        el: '#addPostWrapper',
        template: _.template(addPostTemplate),
        events: {
            "click #btnAddNewPost": "onBtnAddNewPost"
        },
        initialize: function (options) {
            this.socket = options.socket;
            this.collection = options.categoryCollection;
            this.postCollection = options.postCollection;
        },
        hide: function () {
            this.$el.hide(450);
        },
        show: function () {
            this.$el.show(450);
        },
        onBtnAddNewPost: function (e) {
            e.preventDefault();
            var self = this;
            var $title = $('#title');
            var $categories = $('#categories option:selected');
            var $content = $('#content');

            var title = _.escape($title.val());
            var categoriesValues = $categories
                .map(function () {
                    return this.value;
                })
                .get();
            var content = _.escape($content.val());
            var dateOfCreation =  new Date();

            var post = new PostModel({
                title: title,
                categories: categoriesValues,
                content: content,
                dateOfCreation:dateOfCreation
            });

            post.save({}, {
                success: function (xhr) {
                    self.trigger('addedNewPost', {
                        post: xhr
                    });
                    $title.val('');
                    $content.val('');
                    _.each($categories, function(category){
                        category['selected'] = false;
                    });
                    var author = xhr.get('author');
                    self.socket.emit('addedNewPost',{
                        author: author.firstName + ' ' + author.lastName,
                        title: xhr.get('title')
                    });
                }
            });
        },
        render: function () {
            this.$el.html(this.template({categories: this.collection.toJSON()}));
        }
    });
    return AddPostView;
});
