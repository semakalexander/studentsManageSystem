define([
    'underscore',
    'backbone',
    'models/category/category'
], function (_, Backbone, CategoryModel) {
    var CategoryCollection = Backbone.Collection.extend({
        model: CategoryModel,
        url: '/categories/',
        search: function (options) {
            var result = this.where(options);
            return new CategoryCollection(result);
        }
    });
    return CategoryCollection;
});