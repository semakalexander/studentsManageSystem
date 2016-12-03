module.exports = function (app, db) {
    'use strict';

    var models = require('../helpers/models.js')(db);
    var userRoute = require('./user')(models);
    var groupRoute = require('./group')(models);
    var categoryRoute = require('./category')(models);
    var postRoute = require('./post')(models);
    var subjectRoute = require('./subject')(models);

    app.use('/users', userRoute);
    app.use('/groups', groupRoute);
    app.use('/categories', categoryRoute);
    app.use('/posts', postRoute);
    app.use('/subjects', subjectRoute);

    function errHandler(err, req, res, next) {
        var msg;
        var status = err.status || 500;

        if (err.status != 200) {
            msg = err.msg;
        }

        if (process.env.NODE_ENV === 'production') {
            res.status(status).send({error: msg});
        }
        else {
            res.status(status).send({error: msg + '\n' + err.stack});
        }
    }

    app.use(errHandler);

};

