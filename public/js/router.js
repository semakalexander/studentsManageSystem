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
    'views/subjects/subscribeTeacher/MainView',
    'views/groups/MainView',
    'views/groups/crud/CrudView',
    'views/categories/MainView',
    'views/profiles/TeacherProfile',
    'views/posts/PostsWallView',
    'views/marks/MainView'
], function ($, _, Backbone, HomeView, UsersListView, UsersCrudView, LoginView, RegistrationView, SubjectsCrudView,
             SubscribeTeacherMainView, GroupsMainView, GroupsCrudView, CategoriesMainView, TeacherProfileView,
             PostsWallView, MarksMainView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "users": "users",
            "users/crud": "usersCrud",
            "account/login": "login",
            "account/registration": "registration",
            "subjects/crud": "subjectsCrud",
            "subjects/subscribeTeacher": "subscribeTeacher",
            "groups/": "groups",
            "groups/crud": "groupsCrud",
            "categories/crud": "categoriesCrud",
            "profiles/teacher": "teacherProfile",
            "posts/:category": "postsByCategory",
            "profiles/:author": "postsByAuthor",
            "marks/": "marksOfGroupForTeacher"
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

        app_router.on("route:postsByCategory", function (category) {
            var postsView = new PostsWallView({category: category});
        });

        app_router.on("route:postsByAuthor", function (author) {
            var postsView = new PostsWallView({author:author});
        });

        app_router.on("route:marksOfGroupForTeacher", function () {
            var marksView = new MarksMainView();
        });

        app_router.on("route:subscribeTeacher", function () {
            var subscribeTeacherMainView = new SubscribeTeacherMainView();
        });



        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});
