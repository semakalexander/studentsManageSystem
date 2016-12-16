define([
    'underscore',
    'backbone',
    '../models/user'
], function (_, Backbone, UserModel) {
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/users'
    });
    return UserCollection;
});