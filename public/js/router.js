define([
    'jquery',
    'underscore',
    'socketio',
    'backbone',
    'views/home/HomeView',
    'views/users/ListView',
    'views/users/MainView',
    'views/account/ConfirmRegistrationView',
    'views/account/LogInView',
    'views/account/RegistrationView',
    'views/account/ResetPasswordView',
    'views/notifications/MainView',
    'views/subjects/MainView',
    'views/subjects/subscribeTeacher/MainView',
    'views/groups/MainView',
    'views/groups/crud/MainView',
    'views/categories/MainView',
    'views/profiles/TeacherProfile',
    'views/posts/PostsWallView',
    'views/marks/MainView',
    'text!templates/helpers/popupNotification.html'
], function ($, _, io, Backbone, HomeView, UsersListView, UsersCrudView, ConfirmRegistrationView, LogInView,
             RegistrationView, ResetPasswordView, NotificationsMainView, SubjectsCrudView, SubscribeTeacherMainView,
             GroupsMainView, GroupsCrudView, CategoriesMainView, TeacherProfileView, PostsWallView, MarksMainView,
             PopupNotificationTemplate) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "home": "index",
            "users/crud": "usersCrud",
            "account/confirm/:id/:key/:email": "confirm",
            "account/logIn": "logIn",
            "account/logOut": "logOut",
            "account/registration": "registration",
            "account/forgot/:id/:key": "forgot",
            "account/notifications": "notifications",
            "subjects/crud": "subjectsCrud",
            "subjects/subscribeTeacher": "subscribeTeacher",
            "groups/": "groups",
            "groups/crud": "groupsCrud",
            "categories/crud": "categoriesCrud",
            "profiles/teacher": "teacherProfile",
            "profiles/:author": "postsByAuthor",
            "posts/:category": "postsByCategory",
            "marks/": "marksOfGroupForTeacher"
        },
        execute: function (cb, args) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            if (cb) {
                cb.apply(this, args);
            }
        },
        initialize: function (socket) {
            socket.on('addedPost', function (data) {
                var template = _.template(PopupNotificationTemplate);
                var notification = template({
                    title: data.title,
                    author: data.author
                });
                var $notification = $(notification);
                $('#popupNotifications').prepend($notification);
                setTimeout(function () {
                    $notification.hide({bottom: '-=70'}, 500, function () {
                        $notification.remove();
                    });
                }, 4000);
            });

            socket.on('connectedOnServer', function () {
                $.ajax({
                    url: "account/getLoggedUser",
                    method: "GET",
                    success: function (xhr) {
                        if (xhr) {
                            socket.emit('connectedOnClient', {user: xhr});
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            });

            socket.on('newNotifications', function (data) {
                var count = data.notificationsCount;
                $('#notifications-count').html(count);
            });


            //all
            this.on("route:index", function () {
                this.view = new HomeView();
            });

            // admin
            this.on("route:usersCrud", function () {
                this.view = new UsersCrudView();
            });

            // all unauth
            this.on("route:logIn", function () {
                this.view = new LogInView();
            });

            // all auth
            this.on("route:logOut", function () {
                $.ajax({
                    url: "account/logOut",
                    method: "DELETE",
                    success: function () {
                        return Backbone.history.navigate("#home", {trigger: true});
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            });

            // all unauth
            this.on("route:registration", function () {
                this.view = new RegistrationView()
            });

            // all unauth
            this.on("route:forgot", function (id, key) {
                this.view = new ResetPasswordView({
                    id: id,
                    key: key
                });
            });

            // all unauth
            this.on("route:confirm", function (id, key, email) {
                this.view = new ConfirmRegistrationView({
                    id: id,
                    key: key,
                    email: email
                });
            });

            // all auth
            this.on("route:notifications", function () {
                this.view = new NotificationsMainView({});
            });

            // admin
            this.on("route:subjectsCrud", function () {
                this.view = new SubjectsCrudView();
            });

            // all auth
            this.on("route:subscribeTeacher", function () {
                this.view = new SubscribeTeacherMainView();
            });

            // teachers
            this.on("route:groups", function () {
                this.view = new GroupsMainView();
            });

            // admin
            this.on("route:groupsCrud", function () {
                this.view = new GroupsCrudView();
            });

            // admin
            this.on("route:categoriesCrud", function () {
                this.view = new CategoriesMainView();
            });

            // teacher
            this.on("route:teacherProfile", function () {
                this.view = new TeacherProfileView({socket: socket});
            });

            // all auth
            this.on("route:postsByAuthor", function (author) {
                this.view = new PostsWallView({
                    socket: socket,
                    author: author
                });
            });

            // all auth
            this.on("route:postsByCategory", function (category) {
                this.view = new PostsWallView({
                    socket: socket,
                    category: category
                });
            });


            this.on("route:marksOfGroupForTeacher", function () {
                this.view = new MarksMainView();
            });

            Backbone.history.start();
        }
    });

    return AppRouter;
});