"use strict";
var http_1 = require('http');
var ws = require('ws');
var server = http_1.createServer();
var wss = new ws.Server({ server: server });
server.listen(process.env.PORT || 9090);
wss.on('connection', function (ws) {
    console.log('client connected');
    setInterval(function () {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ cmd: 'on' }));
        }
        setTimeout(function () {
            if (ws.readyState === 1) {
                ws.send(JSON.stringify({ cmd: 'off' }));
            }
        }, 750);
    }, 1500);
});
