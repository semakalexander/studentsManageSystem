var SocketEvents = function (app) {
    var io = app.get('io');

    io.on('connect', function (socket) {
        socket.emit('connectedOnServer');

        socket.on('clientConnected', function (data) {
            console.log(data);
        });

        socket.on('postAdded', function (data) {
            console.log(data);
        });

        socket.on('disconnect', function () {
            socket.disconnect();
        })

    });


    this.addedNewPost = function (req, res, next) {
        console.log('addedNewPost server');


        io.emit('addedPost', {
            title:req.body.title,
            author: req.session.userName
        });

        return next();
    };

};

module.exports = SocketEvents;