define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var UserModel = Backbone.Model.extend({
        defaults:{
            email: "",
            password: "",
            login: "",
            firstName: "",
            lastName: "",
            role: "",
            course: 1,
            age: 18
        },
        validate: function (attrs, options) {
            if(!attrs.login || !attrs.password || !attrs.email || attrs.email.length < 1){
                return "error";
            }
        }
    });
    return UserModel;
});

