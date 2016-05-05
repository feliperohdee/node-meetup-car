import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let wss: ws.Server = new ws.Server({ port: (process.env.PORT || 9090) });

wss.on('connection', ws => {
	console.log('client connected');

	setInterval(() => {
		ws.send(JSON.stringify({ cmd: 'on' }));

		setTimeout(() => {
			ws.send(JSON.stringify({ cmd: 'off' }));
		}, 750);
	}, 1500);
});
