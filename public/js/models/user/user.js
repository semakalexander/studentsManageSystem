define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var UserModel = Backbone.Model.extend({
        idAttribute: '_id',
        defaults:{
            email: "",
            password: "",
            login: "",
            firstName: "",
            lastName: "",
            role: "",
            course: 1,
            age: 18
        }
    });
    return UserModel;
});

