define([
    'jquery',
    'underscore',
    'backbone',
    'views/users/list'
], function ($, _, Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '/users': 'showUsers',
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter();
        app_router.on('showUsers', function () {
            var usersListView = new UsersListView();
            usersListView.render();
        });

        app_router.on('defaultAction', function (actions) {
            console.log('No route: ', actions);
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});