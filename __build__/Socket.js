"use strict";
var ws = require('ws');
var rxjs_1 = require('rxjs');
var Socket = (function () {
    function Socket() {
        this.client = new ws('ws://node-remote-server.herokuapp.com');
        // setup observables
        this.onOpen = rxjs_1.Observable.fromEvent(this.client, 'open')
            .mapTo(this.client);
        this.onMessage = rxjs_1.Observable.fromEvent(this.client, 'message')
            .map(function (data) {
            console.log('received data', data);
            try {
                return JSON.parse(data);
            }
            catch (e) {
                return data;
            }
        })
            .filter(function (data) { return typeof data.cmd !== 'undefined'; });
    }
    /**
     * send data trough websocket
     * @param {any} data
     */
    Socket.prototype.send = function (data) {
        this.client.send(JSON.stringify(data));
    };
    return Socket;
}());
exports.Socket = Socket;
