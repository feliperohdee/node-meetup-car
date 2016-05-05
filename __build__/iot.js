"use strict";
var gpio = require('rpi-gpio');
gpio.setup(7, gpio.DIR_OUT);
setTimeout(function () {
    gpio.write(7, 1);
}, 1500);
setInterval(function () {
    gpio.write(7, 1);
    setTimeout(function () {
        gpio.write(7, 1);
    }, 500);
}, 1000);
