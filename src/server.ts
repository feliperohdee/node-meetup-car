import {createServer, Server} from 'http';
import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let server: Server = createServer();
let wss: ws.Server = new ws.Server({ server });
let pi: Set<ws> = new Set<ws>();

server.listen(process.env.PORT || 9090);

wss.on('connection', ws => {
	console.log('client connected');

	ws.on('message', data => {
		data = JSON.parse(data);
		console.log('received data', data);

		switch (data.cmd) {
			case 'subscribePi':
				pi.add(ws);
				break;
			case 'unsubscribePi':
				pi.delete(ws);
				break;
			default:
				pi.forEach(ws => ws.send(JSON.stringify({ cmd: data.cmd })));
				break;
		}
	});

	ws.on('close', () => {
		console.log('removed node');
		pi.delete(ws);
	});
});
