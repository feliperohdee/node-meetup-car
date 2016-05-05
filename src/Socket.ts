import * as ws from 'ws';
import {Observable, Subject} from 'rxjs';

export class Socket{
	private client: ws;
	public onOpen: Observable<ws>;
	public onMessage: Observable<any>;

	constructor(){
		this.client = new ws('ws://node-remote-server.herokuapp.com');

		// setup observables
		this.onOpen = Observable.fromEvent<ws>(this.client, 'open')
			.mapTo(this.client);

		this.onMessage = Observable.fromEvent<any>(this.client, 'message')
			.map(data => {
				console.log('received data', data);

				try {
					return JSON.parse(data);
				} catch (e) {
					return data;
				}
			})
			.filter(data => typeof data.cmd !== 'undefined');

	}

	/**
	 * send data trough websocket
	 * @param {any} data
	 */
	send(data: any): void{
		this.client.send(JSON.stringify(data));
	}
}
