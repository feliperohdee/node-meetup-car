"use strict";
var ws = require('ws');
var gpio = require('rpi-gpio');
var pin = 18;
var client = new ws('ws://node-remote-server.herokuapp.com');
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);
client.on('open', function () {
    console.log('client is open');
    client.on('message', function (data) {
        data = JSON.parse(data);
        if (data.cmd === 'on') {
            gpio.write(pin, 1, function () { return console.log('up'); });
        }
        else {
            gpio.write(pin, 0, function () { return console.log('down'); });
        }
    });
});
