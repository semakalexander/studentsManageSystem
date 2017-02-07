'use strict';


require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/dist/jquery',
        jquery_ui: 'libs/jquery-ui/jquery-ui',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
        models: 'models/',
        collections: 'collections/',
        templates: '../templates/',
        views: 'views/',
        socketio: './libs/socket.io-client/dist/socket.io'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        jquery_ui: ['jquery'],
        Backbone: ['jquery', 'underscore'],
        'socketio':{
            exports:'io'
        }
    }

});

require(['app', 'socketio'], function (App,io) {
    App.initialize(io);
});