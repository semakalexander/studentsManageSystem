define([
        'jquery',
        'underscore',
        'backbone',
        'router'
    ],
    function ($, _, Backbone, Router) {
        var initialize = function (io) {
            var socket = io.connect({});
            var router = new Router(socket);
            // Router.initialize(socket);
        };

        return {
            initialize: initialize
        };
    });