"use strict";
var http_1 = require('http');
var ws = require('ws');
var server = http_1.createServer();
var wss = new ws.Server({ server: server });
var pi = new Set();
server.listen(process.env.PORT || 9090);
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.send('welcome to real time world!');
    ws.on('message', function (data) {
        try {
            data = JSON.parse(data);
        }
        catch (e) { }
        console.log('received data', data);
        if (!data.cmd) {
            return;
        }
        switch (data.cmd) {
            case 'subscribePi':
                pi.add(ws);
                break;
            case 'unsubscribePi':
                pi.delete(ws);
                break;
            default:
                pi.forEach(function (ws) { return ws.send(JSON.stringify({ cmd: data.cmd })); });
                break;
        }
    });
    ws.on('close', function () {
        console.log('removed node');
        pi.delete(ws);
    });
});
