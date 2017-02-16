define([
        'jquery',
        'underscore',
        'backbone',
        'router'
    ],
    function ($, _, Backbone, Router) {
        var initialize = function (io) {
            var socket = io.connect({});
            Router.initialize(socket);
        };

        return {
            initialize: initialize
        };
    });