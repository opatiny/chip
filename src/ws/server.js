// taken from: https://github.com/cheminfo-js/chip
// this code allows to show the values of the accelerometer in a web page.

var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var http = require('http');
var accelerometer = require('./acceleromter');

var currentStatus = {};
accelerometer(function () {
    currentStatus.x = this.x;
    currentStatus.y = this.y;
    currentStatus.z = this.z;
    currentStatus.pitch = this.pitch;
    currentStatus.roll = this.roll;
    currentStatus.acceleration = this.acceleration;
    currentStatus.inclination = this.inclination;
    currentStatus.orientation = this.orientation;
    currentStatus.epoch = Date.now();
});

console.log('Accelerometer created');

var app = express();
var server = http.createServer(app);
app.use(express.static(path.join(__dirname, '/public')));
server.listen(8080);

var wss = new WebSocketServer({server: server});
wss.on('connection', function (ws) {
    var id = setInterval(function () {
        ws.send(JSON.stringify(currentStatus), function () { /* ignore errors */ });
    }, 100);
    console.log('started client interval');
    ws.on('close', function () {
        console.log('stopping client interval');
        clearInterval(id);
    });
});
