define([
    'jquery',
    'underscore',
    'backbone',
    'models/post/post',
    'text!templates/posts/add.html',
    'text!templates/helpers/notification.html',
    'socketio'
], function ($, _, Backbone, PostModel, addPostTemplate) {
    var AddPostView = Backbone.View.extend({
        el: '#addPostWrapper',
        template: _.template(addPostTemplate),
        events: {
            "click #btnAddNewPost": "onBtnAddNewPost"
        },
        initialize: function (options) {
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
            var categoriesText = $categories
                .map(function () {
                    return this.text;
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
                success: function () {
                    self.trigger('addedNewPost', {
                        post: {
                            title: title,
                            categories: categoriesText,
                            content: content,
                            dateOfCreation: dateOfCreation
                        }
                    });
                    $title.val('');
                    $content.val('');
                    _.each($categories, function(category){
                        category['selected'] = false;
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
