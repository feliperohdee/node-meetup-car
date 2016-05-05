import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let pin: number = 18;
let client = new ws('ws://node-remote-server.herokuapp.com');

gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);

client.on('open', () => {
	console.log('client is open');

	client.send(JSON.stringify({cmd: 'subscribePi', id: 'ledPi'}));

	client.on('message', data => {
		
		try{
			data = JSON.parse(data);
		}catch(e){}

		console.log('received data', data);
		
		if (data.cmd === 'on'){
			gpio.write(pin, 1);
		}else{
			gpio.write(pin, 0);
		}
	});
});
