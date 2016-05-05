"use strict";
var gpio = require('rpi-gpio');
var pin = 15;
gpio.setup(pin, gpio.DIR_OUT, function () { return go(); });
function go() {
    setInterval(function () {
        console.log('write');
        gpio.write(pin, 1);
        setTimeout(function () {
            console.log('teardown');
            gpio.write(pin, 0);
        }, 500);
    }, 1000);
}
