define([
    'underscore',
    'backbone',
    'models/mark/mark'
], function (_, Backbone, MarkModel) {
    var MarkCollection = Backbone.Collection.extend({
        model: MarkModel,
        url: '/marks/',
        search: function (options) {
            var result = this.where(options);
            return new MarkCollection(result);
        }
    });
    return MarkCollection;
});