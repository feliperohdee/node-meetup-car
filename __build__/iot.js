"use strict";
var ws = require('ws');
var gpio = require('rpi-gpio');
var pin = 18;
var client = new ws('ws://node-remote-server.herokuapp.com');
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);
client.on('open', function () {
    console.log('client is open');
    client.send(JSON.stringify({ cmd: 'subscribePi', id: 'ledPi' }));
    client.on('message', function (data) {
        data = JSON.parse(data);
        console.log('received data', data);
        if (data.cmd === 'on') {
            gpio.write(pin, 1);
        }
        else {
            gpio.write(pin, 0);
        }
    });
});
