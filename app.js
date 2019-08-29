var express = require('express');
var www = require('./src/www.js');
var server = require('./src/server.js');
var app = express();

global.__dirname = __dirname;
global.__path = __dirname;

app.get('/', www('pages/index.html'));

app.get('/css/:file', www('styles/'));
app.get('/js/:file', www('scripts/'));

var http = app.listen(8090);
var socket = server(http);

console.log('Servidor iniciado!');