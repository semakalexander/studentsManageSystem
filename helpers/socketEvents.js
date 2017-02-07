var SocketEvents = function (app) {
    var io = app.get('io');

    io.on('connect', function (socket) {
        socket.emit('connectedOnServer');

        socket.on('clientConnected', function (data) {
            console.log(data);
        });

        socket.on('disconnect', function () {
            socket.disconnect();
        })

    });


};

module.exports = SocketEvents;