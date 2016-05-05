import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let pin: number = 15;

gpio.setup(pin, gpio.DIR_OUT, () => go());

function go() {
	setInterval(() => {
		console.log('write');
		gpio.write(pin, 1);

		setTimeout(() => {
			console.log('teardown');
			gpio.write(pin, 0);
		}, 500);
	}, 1000);
}
