define([
        'jquery',
        'underscore',
        'backbone',
        'router'
    ],
    function ($, _, Backbone, Router) {
        var initialize = function (io) {

            var socket = io.connect({});
            socket.on('connectedOnServer', function (data) {

            });
            Router.initialize();


        };

        return {
            initialize: initialize
        };
    });