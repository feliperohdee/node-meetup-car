import * as ws from 'ws';
import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';

let pin: number = 18;
let client: ws = new ws('ws://node-remote-server.herokuapp.com');

gpio.setup(pin, gpio.DIR_OUT);
gpio.setMode(gpio.MODE_BCM);

Observable.fromEvent<any>(client, 'open')
	.subscribe(() => {
		console.log('client is open');
		client.send(JSON.stringify({ cmd: 'subscribePi', id: 'ledPi' }));
	});

Observable.interval(15000)
	.filter(() => client.readyState === client.OPEN)
	.subscribe(() => {
		client.send('ping');
	});

Observable.fromEvent<any>(client, 'message')
	.subscribe(data => {
		try {
			data = JSON.parse(data);
		} catch (e) { }

		console.log('received data', data);

		if (data.cmd === 'on') {
			gpio.write(pin, 1);
		} else {
			gpio.write(pin, 0);
		}
	});
