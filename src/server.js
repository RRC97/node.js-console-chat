var io = require('socket.io');

var server = function(listen) {
    var socketServer = io.listen(listen);
    var users = [];
    var messages = [];
    
    socketServer.on('connection', function(socket) {
        socket.on('register', function(data, callback) {
            if(data.username in users) {
                callback(false);
            } else {
                console.log('user created: ' + data.username);
                socket.username = data.username;
                socket.password = data.password;
                users[data.username] = socket;
                callback(true);
            }
        });
        socket.on('login', function(data, callback) {
            if(data.username in users) {
                if(users[data.username].password == data.password) {
                    socket.username = data.username;
                    socket.password = data.password;
                    users[data.username] = socket;
                    console.log('user logged in: ' + data.username);
                    callback(true, true);
                } else {
                    callback(true, false);
                }
            } else {
                callback(false, false);
            }
        });
        
        socket.on('sendMessage', function(data, callback) {
            if(socket.username in users) {
                var user = users[socket.username];
                var date = Date.now();

                var message = {
                    user: user.username,
                    date: date,
                    message: data.message,
                    direct: data.direct,
                    to: data.destination
                }
                
                messages.push(message);
                
                if(message.direct) {
                    
                } else {
                    console.log('message sended');
                    socket.broadcast.emit('updateMessages', message);
                    callback(message);
                }
            }
        });
    });
    
    return socketServer;
}

module.exports = server;