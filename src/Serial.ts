import * as serialport from 'serialport';
import {Observable, Subject} from 'rxjs';

export class Serial{
	private port: serial.port;
	private portProps: serial.portProps;
	public onData: Subject<string> = new Subject<string>();
	public onReady: Observable<serial.port>;

	constructor(){
		serialport.list((err, ports) => {
			if (err) {
				console.error(err);
			}

			/**
			 * Escaneia as portas seriais disponíveis buscando por aquela que possa ser o arduino
			 */
			this.portProps = ports.find(port => port.manufacturer === 'FTDI');
			/**
			 * Ao encontra-la abre uma conexão e faz o setup do parser para finalizar a leitura dos bytes quando encontrar uma quebra de linha
			 */
			this.port = new serialport.SerialPort(this.portProps.comName, {
				parser: serialport.parsers.readline('\n')
			}, false);

			/**
			 * callback quando a porta abre, começa a monitorar mensagens e as envia para o Subject onData, que nada mais é
			 * que um proxy de mansagens
			 */
			this.port.open(err => {
				if (err) {
					return this.onData.error(err);
				}

				Observable.fromEvent(this.port, 'data')
					.subscribe(this.onData);
			});
		});

		/**
		 *  Aqui definimos um observable que monitora as mensagens em busca de uma que seja "Ready", indicando que o Arduino
		 *  está pronto para receber comandos
		 */
		this.onReady = this.onData
			.filter(data => data.trim() === 'Ready')
			.map(() => this.port);
	}

	/**
	 * send data through serial
	 * @param {string} data
	 */
	send(data: string): void{
		setTimeout(() => this.port.write(data), 15);
	}
}
