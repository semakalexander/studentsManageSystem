module.exports = function (db) {
    var express = require('express');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var MemoryStore = require('connect-mongo')(session);
    var sessionOptions = require('./config/session')(db, MemoryStore);
    var cookieParser = require('cookie-parser');
    var path = require('path');

    var socket = require('socket.io');
    var http = require('http');
    var io;
    var server;

    var app = express();

    app.use(bodyParser.json({strict: false, inflate: true, limit: 1024 * 1024 * 200}));
    app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200}));

    app.use(cookieParser('StudentsKey'));
    app.use(session(sessionOptions));

    app.use(express.static(path.join(__dirname + '/public')));

    server = http.createServer(app);
    io = socket(server);
    app.set('io', io);
    require('./helpers/socketEvents')(app);

    require('./routes/index')(app, db);
    return server;
};
