interface IRpiDir {
	DIR_OUT?: string;
	DIR_IN?: string;
}

interface IRpiMode {
	MODE_RPI?: string;
	MODE_BCM?: string;
}

interface IRpiEdge {
	EDGE_NONE?: string;
	EDGE_RISING?: string;
	EDGE_FALLING?: string;
	EDGE_BOTH?: string;
}

interface IRpi extends IRpiDir, IRpiMode, IRpiEdge, NodeJS.EventEmitter {
	setup(channel: number, direction: IRpiDir, edge?: IRpiEdge, callback?: Function): void;
	read(channel: number, callback: Function): void;
	write(channel: number, value: any, callback?: Function): void;
	setMode(mode: IRpiMode): void;
	destroy(): void;
}


declare module 'rpi-gpio' {
	var rpi: IRpi;

	export = rpi;
}
