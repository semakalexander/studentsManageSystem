define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/users/ListView',
    'views/users/CRUDView',
    'views/account/LoginView',
    'views/account/RegistrationView',
    'views/subjects/CRUDView'
], function ($, _, Backbone, HomeView, UsersListView, UsersCrudView, LoginView, RegistrationView, SubjectsCrudView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users",
            "users/crud": "usersCrud",
            "account/login": "login",
            "account/registration": "registration",
            "subjects/crud": "subjectsCrud"
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

        app_router.on("route:usersCrud", function () {
            var usersCrudView = new UsersCrudView();
        });

        app_router.on("route:login", function () {
            var loginView = new LoginView();
        });

        app_router.on("route:registration", function () {
            var registrationView = new RegistrationView()
        });


        app_router.on("route:subjectsCrud", function () {
            var subjectsCrudView = new SubjectsCrudView();
        });
        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});
