"use strict";
var http_1 = require('http');
var rxjs_1 = require('rxjs');
var ws = require('ws');
var server = http_1.createServer();
var wss = new ws.Server({ server: server });
var pi = new Set();
server.listen(process.env.PORT || 9090);
rxjs_1.Observable.fromEvent(wss, 'connection')
    .do(function (ws) {
    console.log('client connected');
    ws.send('welcome to real time world!');
})
    .mergeMap(function (ws) {
    var takeUntil = rxjs_1.Observable.fromEvent(ws, 'close')
        .first()
        .do(function () {
        console.log('removed node');
        pi.delete(ws);
    });
    return rxjs_1.Observable.fromEvent(ws, 'message')
        .takeUntil(takeUntil)
        .map(function (data) { ws, data; });
})
    .subscribe(function (response) {
    var ws = response.ws;
    var data = response.data;
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
            pi.add(response.ws);
            break;
        case 'unsubscribePi':
            pi.delete(response.ws);
            break;
        default:
            pi.forEach(function (ws) { return ws.send(JSON.stringify({ cmd: data.cmd })); });
            break;
    }
}, function (e) { return console.log('error => ', e); }, function () {
    console.log('complete');
});
