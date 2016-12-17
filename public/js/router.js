define([
    'jquery',
    'underscore',
    'backbone',
    'views/users/list'
], function ($, _, Backbone, UsersListView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users"
        }
    });

    var initialize = function () {
        var app_router = new AppRouter();

        app_router.on("route:users", function () {
            var usersListView = new UsersListView();
        });



        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});
