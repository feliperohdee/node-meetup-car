import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

gpio.setup(7, gpio.DIR_OUT);

setTimeout(() => {
	gpio.write(7, 1);
}, 1500);

setInterval(() => {
	gpio.write(7, 1);

	setTimeout(() => {
		gpio.write(7, 1);
	}, 500);
}, 1000);
