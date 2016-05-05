import * as gpio from 'rpi-gpio';
import {Serial} from './Serial';
import {Socket} from './Socket';

let serial: Serial = new Serial();
let socket: Socket = new Socket();

// setup pi
let pin: number = 18;
gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);

serial.onData
	.subscribe(data => console.log('serial data', data));

serial.onReady
	.subscribe(port => {
		// 
		socket.onOpen
			.subscribe(() => {
				console.log('client is open');

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

