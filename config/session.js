'use strict';

module.exports = function (connection, Store) {
    return {
        name: 'key',
        key: 'StudentsKey',
        secret: 'mysupersecret',
        saveUninitialized: true,
        resave: false,
        store: new Store({
            mongooseConnection: connection
        }),

        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 31
        }

    }
};