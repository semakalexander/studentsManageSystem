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
        comparator: function (model) {
            var date = new Date(model.get('dateOfCreation'));
            return -date.getTime();
        }
    });
    return PostCollection;
});