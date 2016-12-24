define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/users/ListView',
    'views/users/CRUDView',
    'views/account/LoginView',
    'views/account/RegistrationView'
], function ($, _, Backbone, HomeView, UsersListView, CRUDView, LoginView, RegistrationView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users",
            "users/CRUD": 'CRUD',
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
            usersListView.getUsersFromDB();
        });

        app_router.on("route:CRUD", function () {
            var crudView = new CRUDView();
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
