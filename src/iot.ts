import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let pin: number = 18;

gpio.setup(pin, gpio.DIR_OUT, () => go());
gpio.setMode(gpio.MODE_BCM);

function go() {
	setInterval(() => {
		// console.log('write');
		gpio.write(pin, 1, () => console.log('up'));

		setTimeout(() => {
			// console.log('teardown');
			gpio.write(pin, 0, () => console.log('down'));
		}, 500);
	}, 1000);
}
