define([
    'jquery',
    'underscore',
    'socketio',
    'backbone',
    'views/home/HomeView',
    'views/users/ListView',
    'views/users/MainView',
    'views/account/LogInView',
    'views/account/RegistrationView',
    'views/account/ResetPasswordView',
    'views/subjects/MainView',
    'views/subjects/subscribeTeacher/MainView',
    'views/groups/MainView',
    'views/groups/crud/MainView',
    'views/categories/MainView',
    'views/profiles/TeacherProfile',
    'views/posts/PostsWallView',
    'views/marks/MainView',
    'text!templates/helpers/notification.html'
], function ($, _, io, Backbone, HomeView, UsersListView, UsersCrudView, LogInView, RegistrationView, ResetPasswordView,
             SubjectsCrudView, SubscribeTeacherMainView, GroupsMainView, GroupsCrudView, CategoriesMainView,
             TeacherProfileView, PostsWallView, MarksMainView, notificationTemplate) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "home": "index",
            "users/crud": "usersCrud",
            "account/logIn": "logIn",
            "account/logOut": "logOut",
            "account/registration": "registration",
            "account/forgot/:id/:key": "forgot",
            "subjects/crud": "subjectsCrud",
            "subjects/subscribeTeacher": "subscribeTeacher",
            "groups/": "groups",
            "groups/crud": "groupsCrud",
            "categories/crud": "categoriesCrud",
            "profiles/teacher": "teacherProfile",
            "profiles/:author": "postsByAuthor",
            "posts/:category": "postsByCategory",
            "marks/": "marksOfGroupForTeacher"
        }
    });

    var initialize = function (socket) {
        var app_router = new AppRouter();

        socket.on('addedPost', function (data) {
            var template = _.template(notificationTemplate);
            var notification = template({
                title: data.title,
                author: data.author
            });
            var $notification = $(notification);
            $('#notifications').prepend($notification);
            setTimeout(function () {
                $notification.hide({bottom: '-=70'}, 500, function () {
                    $notification.remove();
                });
            }, 4000);
        });

        app_router.on("route:index", function () {
            var homeView = new HomeView();
        });

        app_router.on("route:usersCrud", function () {
            var usersCrudView = new UsersCrudView();
        });

        app_router.on("route:logIn", function () {
            var logInView = new LogInView();
        });

        app_router.on("route:logOut", function () {
            $.ajax({
                url: "account/logOut",
                method: "POST",
                success: function (xhr) {
                    return Backbone.history.navigate("#home", {trigger: true});
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });
        });

        app_router.on("route:registration", function () {
            var registrationView = new RegistrationView()
        });

        app_router.on("route:forgot", function (id, key) {
            var forgotView = new ResetPasswordView({
                id: id,
                key: key
            })
        });

        app_router.on("route:subjectsCrud", function () {
            var subjectsCrudView = new SubjectsCrudView();
        });

        app_router.on("route:subscribeTeacher", function () {
            var subscribeTeacherMainView = new SubscribeTeacherMainView();
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
            var teacherProfile = new TeacherProfileView({socket: socket});
        });

        app_router.on("route:postsByAuthor", function (author) {
            var postsView = new PostsWallView({
                socket: socket,
                author: author
            });
        });

        app_router.on("route:postsByCategory", function (category) {
            var postsView = new PostsWallView({
                socket: socket,
                category: category
            });
        });

        app_router.on("route:marksOfGroupForTeacher", function () {
            var marksView = new MarksMainView();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
