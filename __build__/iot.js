"use strict";
var gpio = require('rpi-gpio');
var Serial_1 = require('./Serial');
var Socket_1 = require('./Socket');
// setup pi
var pin = 18;
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);
var serial = new Serial_1.Serial();
serial.onReady
    .subscribe(function (port) {
    var socket = new Socket_1.Socket();
    // 
    socket.onOpen
        .subscribe(function () {
        socket.send({
            cmd: 'subscribePi',
            id: 'ledPi'
        });
    });
    socket.onMessage
        .distinctUntilChanged()
        .subscribe(function (data) {
        console.log('received data', data);
        switch (data.cmd) {
            case 'on':
                gpio.write(pin, 1);
                break;
            case 'off':
                gpio.write(pin, 0);
                break;
            case 'front':
                serial.send('f');
                break;
            case 'stop':
                for (var i = 0; i < 5; ++i) {
                    serial.send('s');
                }
                break;
            case 'left':
                serial.send('l');
                break;
            case 'right':
                serial.send('r');
                break;
        }
    });
});
