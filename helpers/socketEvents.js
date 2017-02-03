var SocketEvents = function (app) {
    var io = app.get('io');

    io.on('connect', function (socket) {
        socket.emit('connectedToServer', {Success: true});

        socket.on('clientConnected', function (data) {
            console.log(data);

            socket.join(data.clientId);
        });

        socket.on('disconnect', function () {
            socket.disconnect();
        })

    })
};

module.exports = SocketEvents;