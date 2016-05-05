"use strict";
var gpio = require('rpi-gpio');
var pin = 18;
gpio.setup(pin, gpio.DIR_OUT, function () { return go(); });
gpio.setMode(gpio.MODE_BCM);
function go() {
    setInterval(function () {
        // console.log('write');
        gpio.write(pin, 1, function () { return console.log('up'); });
        setTimeout(function () {
            // console.log('teardown');
            gpio.write(pin, 0, function () { return console.log('down'); });
        }, 500);
    }, 1000);
}
