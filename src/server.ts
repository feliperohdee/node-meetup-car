import {createServer, Server} from 'http';
import {Observable} from 'rxjs';
import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let server: Server = createServer();
let wss: ws.Server = new ws.Server({ server });
let pi: Set<ws> = new Set<ws>();

server.listen(process.env.PORT || 9090);

Observable.fromEvent<ws>(wss, 'connection')
	.do(ws => {
		console.log('client connected');
		ws.send('welcome to real time world!');
	})
	.mergeMap<any>(ws => {
		let takeUntil: Observable<any> = Observable.fromEvent(ws, 'close')
			.first()
			.do(() => {
				console.log('removed node');
				pi.delete(ws);
			});

		return Observable.fromEvent(ws, 'message')
			.takeUntil(takeUntil)
			.map(data => ({ ws, data }));
	})
	.subscribe(response => {
		let ws: ws = response.ws;
		let data: any = response.data;

		try {
			data = JSON.parse(data);
		} catch (e) { }

		if (!data.cmd) {
			return;
		}

		switch (data.cmd) {
			case 'subscribePi':
				pi.add(response.ws);
				break;
			case 'unsubscribePi':
				pi.delete(response.ws);
				break;
			default:
				pi.forEach(ws => ws.send(JSON.stringify({ cmd: data.cmd })));
				break;
		}
	}, e => console.log('error => ', e));
