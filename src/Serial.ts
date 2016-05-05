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

			this.portProps = ports.find(port => port.manufacturer === 'FTDI');
			this.port = new serialport.SerialPort(this.portProps.comName, {
				parser: serialport.parsers.readline('\n')
			}, false);

			this.port.open(err => {
				if (err) {
					return this.onData.error(err);
				}

				Observable.fromEvent(this.port, 'data')
					.subscribe(this.onData);
			});
		});

		// setup ready observable
		this.onReady = this.onData
			.filter(data => data.trim() === 'Ready')
			.map(() => this.port);
	}

	/**
	 * send data through serial
	 * @param {string} data
	 */
	send(data: string): void{
		this.port.write(data);
	}
}
