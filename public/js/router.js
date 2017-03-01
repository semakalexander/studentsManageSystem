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
    'text!templates/helpers/popupNotification.html',
    'text!templates/helpers/navbar.html'
], function ($, _, io, Backbone, HomeView, UsersListView, UsersCrudView, ConfirmRegistrationView, LogInView,
             RegistrationView, ResetPasswordView, NotificationsMainView, SubjectsCrudView, SubscribeTeacherMainView,
             GroupsMainView, GroupsCrudView, CategoriesMainView, TeacherProfileView, PostsWallView, MarksMainView,
             PopupNotificationTemplate, NavbarTemplate) {
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
                "posts/":"posts",
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
                                var navbarTemplate = _.template(NavbarTemplate);
                                var $navbarMenu = $('#navbarMenu');
                                $navbarMenu.html(navbarTemplate({role: xhr.role}));
                                socket.emit('connectedOnClient', {user: xhr});
                            }
                        },
                        error: function (xhr) {
                            if (xhr.status == 401) {
                                var fragments = Backbone.history.getFragment().split('/');
                                if (fragments.length && fragments.length) {
                                    if (fragments[0] == 'account') {
                                        return;
                                    }
                                }
                                return Backbone.history.navigate('#account/logIn', {trigger: true});
                            }
                        }
                    });
                });

                socket.on('newNotifications', function (data) {
                    var count = data.notificationsCount;
                    $('#notifications-count').html(count);
                });

                this.on("route:index", function () {
                    this.view = new HomeView();
                });

                this.on("route:usersCrud", function () {
                    this.view = new UsersCrudView();
                });

                this.on("route:logIn", function () {
                    this.view = new LogInView();
                });

                this.on("route:logOut", function () {
                    $.ajax({
                        url: "account/logOut",
                        method: "DELETE",
                        success: function () {
                            var navbarTemplate = _.template(NavbarTemplate);
                            var $navbarMenu = $('#navbarMenu');
                            $navbarMenu.html(navbarTemplate({role: null}));
                            return Backbone.history.navigate("#account/logIn", {trigger: true});
                        },
                        error: function (xhr) {
                            console.log(xhr);
                        }
                    });
                });

                this.on("route:registration", function () {
                    this.view = new RegistrationView()
                });

                this.on("route:forgot", function (id, key) {
                    this.view = new ResetPasswordView({
                        id: id,
                        key: key
                    });
                });

                this.on("route:confirm", function (id, key, email) {
                    this.view = new ConfirmRegistrationView({
                        id: id,
                        key: key,
                        email: email
                    });
                });

                this.on("route:notifications", function () {
                    this.view = new NotificationsMainView({});
                });

                this.on("route:subjectsCrud", function () {
                    this.view = new SubjectsCrudView();
                });

                this.on("route:subscribeTeacher", function () {
                    this.view = new SubscribeTeacherMainView();
                });

                this.on("route:groups", function () {
                    this.view = new GroupsMainView();
                });

                this.on("route:groupsCrud", function () {
                    this.view = new GroupsCrudView();
                });

                this.on("route:categoriesCrud", function () {
                    this.view = new CategoriesMainView();
                });

                this.on("route:teacherProfile", function () {
                    this.view = new TeacherProfileView({socket: socket});
                });

                this.on("route:postsByAuthor", function (author) {
                    this.view = new PostsWallView({
                        socket: socket,
                        author: author
                    });
                });

                this.on("route:posts", function () {
                   this.view = new PostsWallView();
                });

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
        })
        ;

    return AppRouter;
})
;