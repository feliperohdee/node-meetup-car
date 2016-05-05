import * as gpio from 'rpi-gpio';
import {Serial} from './Serial';
import {Socket} from './Socket';

// setup pi
let pin: number = 18;
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);

let serial: Serial = new Serial();

serial.onReady
	.subscribe(port => {
		let socket: Socket = new Socket();

		// 
		socket.onOpen
			.subscribe(() => {
				socket.send({
					cmd: 'subscribePi',
					id: 'ledPi'
				});
			});

		socket.onMessage
			.subscribe(data => {
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
						serial.send('s');
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

