"use strict";
var ws = require('ws');
var wss = new ws.Server({ port: 9090 });
wss.on('connection', function (ws) {
    console.log('client connected');
    setInterval(function () {
        ws.send(JSON.stringify({ cmd: 'on' }));
        setTimeout(function () {
            ws.send(JSON.stringify({ cmd: 'off' }));
        }, 750);
    }, 1500);
});
