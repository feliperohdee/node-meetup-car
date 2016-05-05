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
        .subscribe(function (data) {
        switch (data.cmd) {
            case 'on':
                gpio.write(pin, 1);
                break;
            case 'off':
                gpio.write(pin, 0);
                break;
            case 'front':
                port.write('f');
                break;
            case 'stop':
                port.write('s');
                break;
            case 'left':
                port.write('l');
                break;
            case 'right':
                port.write('r');
                break;
        }
    });
});
