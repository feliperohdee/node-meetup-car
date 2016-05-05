"use strict";
var ws = require('ws');
var gpio = require('rpi-gpio');
var rxjs_1 = require('rxjs');
var pin = 18;
var client = new ws('ws://node-remote-server.herokuapp.com');
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);
rxjs_1.Observable.fromEvent(client, 'open')
    .subscribe(function () {
    console.log('client is open');
    client.send(JSON.stringify({ cmd: 'subscribePi', id: 'ledPi' }));
});
rxjs_1.Observable.fromEvent(client, 'message')
    .subscribe(function (data) {
    try {
        data = JSON.parse(data);
    }
    catch (e) { }
    console.log('received data', data);
    if (data.cmd === 'on') {
        gpio.write(pin, 1);
    }
    else {
        gpio.write(pin, 0);
    }
});
