define([
    'underscore',
    'backbone',
    'models/user/user'
], function (_, Backbone, UserModel) {
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/users/',
        search: function (options) {
            var result = this.where(options);
            return new UserCollection(result);
        }
    });
    return UserCollection;
});