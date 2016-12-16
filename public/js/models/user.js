define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var UserModel = Backbone.Model.extend({
        defaults:{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "",
            course: 1,
            age: 18
        }
    });
    return UserModel;
});

