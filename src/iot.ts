import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let pin: number = 18;
let client = new ws('ws://node-remote-server.herokuapp.com');

gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);

client.on('open', () => {
	console.log('client is open');

	client.on('message', data => {
		data = JSON.parse(data);
		
		if (data.cmd === 'on'){
			gpio.write(pin, 1, () => console.log('up'));
		}else{
			gpio.write(pin, 0, () => console.log('down'));
		}
	});
});
