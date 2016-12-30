'use strict';


require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
        models: 'models/',
        collections: 'collections/',
        templates: '../templates/',
        views:'views/'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        Backbone: ['jquery', 'underscore']
    }

});

require(['app'], function (App) {
    App.initialize();
});