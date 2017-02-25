var SocketEvents = function (app) {
    var io = app.get('io');

    io.on('connect', function (socket) {
        console.log(socket.id + ' connected');

        socket.emit('connectedOnServer');

        socket.on('connectedOnClient', function (data) {
            var count = data.user.notifications.newCount;

            if (count) {
                socket.emit('newNotifications', {notificationsCount: count});
            }
        });

        socket.on('addedNewPost', function (data) {
            socket.broadcast.emit('addedPost', data);
        });

        socket.on('subscribeOnAuthor', function (data) {
            var author = data.author;
            socket.join(author);
            console.log(socket.rooms);
        });

        socket.on('disconnect', function () {
            console.log(socket.id + ' disconnected');
            socket.disconnect();
        })

    });


    this.addedNewPost = function (req, res, next) {
        io.emit('addedPost', {
            title: req.body.title,
            author: req.session.userName
        });

        return next();
    };

};

module.exports = SocketEvents;