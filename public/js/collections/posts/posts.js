define([
    'underscore',
    'backbone',
    'models/post/post'
], function (_, Backbone, PostModel) {
    var PostCollection = Backbone.Collection.extend({
        model: PostModel,
        url: '/posts/',
        search: function (options) {
            var result = this.where(options);
            return new PostCollection(result);
        },
        filterByAuthor: function (authorLogin) {
            var result = this.filter(function (post) {
                return post.get('author').login == authorLogin;
            });
            return new PostCollection(result);
        },
        filterByCategory: function (selectedCategory) {
            var self =this;
            var posts = [];
            _.each(self.models, function (post) {
                var categories = post.get('categories');
                _.each(categories, function (category) {
                    if (category.name == selectedCategory) {
                        posts.push(post.toJSON());
                    }
                });
            });
            return posts;
        },
        comparator: function (model) {
            var date = new Date(model.get('dateOfCreation'));
            return -date.getTime();
        }
    });
    return PostCollection;
});