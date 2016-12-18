define([
    'jquery',
    'underscore',
    'backbone',
    'views/home',
    'views/users/list',
    'views/account/login',
    'views/account/registration'
], function ($, _, Backbone, HomeView, UsersListView, LoginView, RegistrationView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users",
            "account/login": "login",
            "account/registration": "registration"
        }
    });

    var initialize = function () {
        var app_router = new AppRouter();

        app_router.on("route:index", function () {
            var homeView = new HomeView();
        });

        app_router.on("route:users", function () {
            var usersListView = new UsersListView();
        });


        app_router.on("route:login", function () {
            var loginView = new LoginView();
        });

        app_router.on("route:registration", function () {
            var registrationView = new RegistrationView()
        });


        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});
