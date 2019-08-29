var System = function(view, input) {
    var newRow = $('<div class="row"></div>');
    var socket = io.connect();
    var logged = false;
    
    this.submit = function(event) {
        event.preventDefault();
        
        var value = input.val();
        
        if(value != "") {
            input.val("");
            
            
            if(isCommand(value)) {
                command(value);
            } else if(logged) {
                socket.emit('sendMessage', {
                    message: value,
                    direct: false,
                    destination: ""
                }, function(data) {
                    createRow('> [' + formatDate(data.date) + ']' + data.user + ": " + data.message, 'lime');
                    $(document).scrollTop(view.height());
                });
            } else {
                createRow('> ' + value);
            }
        }
    }
    
    var command = function(value) {
        var command = "";
        value = value.substring(1);
        splitValue = value.split(" ");
        
        command = splitValue[0];
        value = value.substring(splitValue[0].length + 1);
        
        switch(command) {
            case 'register':
                data = value.split(" ");
                if(data.length > 2) {
                    
                } else if(data.length < 2) {
                    
                } else {
                    registerCommand(data[0], data[1]);
                }
                break;
            case 'login':
                data = value.split(" ");
                if(data.length > 2) {
                    
                } else if(data.length < 2) {
                    
                } else {
                    loginCommand(data[0], data[1]);
                }
                break;
            case 'clear':
                view.html("");
                break;
        }
    }
    
    var registerCommand = function(username, password) {
        socket.emit('register', {
            username: username,
            password: password
        }, function(confirmed) {
            if(confirmed) {
                logged = true;
                createRow('> Registrado com sucesso');
                createRow('> Seja bem vindo(a) ' + username);
                createRow('>');
                
                socket.on('updateMessages', function(data) {
                    createRow('> [' + formatDate(data.date) + ']' + data.user + ": " + data.message);
                    $(document).scrollTop(view.height());
                });
            }
        });
    }
    
    var loginCommand = function(username, password) {
        socket.emit('login', {
            username: username,
            password: password
        }, function(exist, confirmed) {
            if(exist && confirmed) {
                logged = true;
                createRow('> Seja bem vindo(a) ' + username);
                createRow('>');
                
                socket.on('updateMessages', function(data) {
                    createRow('> [' + formatDate(data.date) + ']' + data.user + ": " + data.message);
                    $(document).scrollTop(view.height());
                });
            }
        });
    }
    
    var formatDate = function(timestamp) {
        var date = new Date(timestamp);
        
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        
        var month = 1 + date.getMonth();
        month = month < 10 ? "0" + month : month;
        
        var year = date.getFullYear();
        
        var hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        
        var second = date.getSeconds();
        second = second < 10 ? "0" + second : second;
        
        return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    }
    
    var createRow = function(message, color = 'white') {
        var row = newRow.clone();
        row.text(message);
        row.css('color', color);
        view.append(row);
    }
    
    var isCommand = function(value) {
        if(value[0] == "/") {
            return true;
        }
        
        return false;
    }
}