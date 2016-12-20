'use strict';


require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
        templates: '../templates/'
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