declare module serial {
	interface portProps {
		comName: string;
		pnpId: string;
		manufacturer: string;
	}

	interface port extends NodeJS.EventEmitter {
		isOpen(): boolean;
		open(callback?: (err: Error) => void): void;
		close(callback?: (err: Error) => void): void;
		write(buffer: string, callback?: (err: Error) => void, bytesWritten?: any): void;
		pause(): void;
		resume(): void;
		flush(callback?: (err: Error) => void): void;
		drain(callback?: (err: Error) => void): void;
	}

	interface SerialPortOptions {
		parser: any;
		baudrate?: number;
	}

	interface SerialPort {
		new (path: string, options?: SerialPortOptions, openImmediately?: boolean, callback?: (err: Error) => void): port;
	}

	interface serialPort {
		SerialPort: SerialPort;
		list(callback: (err: Error, ports: Array<portProps>) => void): void;
		parsers: {
			readline: Function;
		}
	}
}

declare module 'serialport' {
	var serial: serial.serialPort;

	export = serial;
}
