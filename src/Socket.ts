import * as ws from 'ws';
import {Observable, Subject} from 'rxjs';

export class Socket{
	private client: ws;
	public onOpen: Observable<ws>;
	public onMessage: Observable<any>;

	constructor(){
		/**
		 * abre uma conexão socket em modo cliente
		 */
		this.client = new ws('ws://node-remote-server.herokuapp.com');

		// observable que monitora quando o cliente apre a conexão e mapeia o resultado
		this.onOpen = Observable.fromEvent<ws>(this.client, 'open')
			.mapTo(this.client);

		// observable que monitora as mensagens e cuida de trasforma-la de string para objeto
		// além de filtrar comandos undefined
		this.onMessage = Observable.fromEvent<any>(this.client, 'message')
			.map(data => {
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
