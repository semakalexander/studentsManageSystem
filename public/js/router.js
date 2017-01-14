define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/users/ListView',
    'views/users/CRUDView',
    'views/account/LoginView',
    'views/account/RegistrationView',
    'views/subjects/CRUDView',
    'views/groups/MainView',
    'views/groups/crud/CrudView',
    'views/categories/MainView',
    'views/profiles/TeacherProfile'
], function ($, _, Backbone, HomeView, UsersListView, UsersCrudView, LoginView, RegistrationView, SubjectsCrudView,
             GroupsMainView, GroupsCrudView, CategoriesMainView, TeacherProfileView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users",
            "users/crud": "usersCrud",
            "account/login": "login",
            "account/registration": "registration",
            "subjects/crud": "subjectsCrud",
            "groups/": "groups",
            "groups/crud": "groupsCrud",
            "categories/crud": "categoriesCrud",
            "profiles/teacher":"teacherProfile"
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

        app_router.on("route:groups", function () {
            var groupsMainView = new GroupsMainView();
        });

        app_router.on("route:groupsCrud", function () {
            var groupsCrudView = new GroupsCrudView();
        });

        app_router.on("route:categoriesCrud", function () {
            var categoriesCrudView = new CategoriesMainView();
        });

        app_router.on("route:teacherProfile", function () {
            var teacherProfile = new TeacherProfileView();
        });


        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});
