define([
    'underscore',
    'backbone',
    'models/group/group'
], function (_, Backbone, UserModel) {
    var GroupCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/groups/',
        search: function (options) {
            var result = this.where(options);
            return new GroupCollection(result);
        },
        comparator: function (model) {
            return model.get('name');
        }
    });
    return GroupCollection;
});