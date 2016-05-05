"use strict";
var http_1 = require('http');
var ws = require('ws');
var server = http_1.createServer();
var wss = new ws.Server({ server: server });
var pi = new Map();
server.listen(process.env.PORT || 9090);
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (data) {
        data = JSON.parse(data);
        console.log('received data', data);
        switch (data.cmd) {
            case 'subscribePi':
                pi.set(data.id, ws);
                break;
            case 'unsubscribePi':
                pi.delete(data.id);
                break;
            default:
                pi.forEach(function (ws) { return ws.send(JSON.stringify({ cmd: data.cmd })); });
                break;
        }
    });
});
