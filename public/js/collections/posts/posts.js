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
        }
    });
    return PostCollection;
});