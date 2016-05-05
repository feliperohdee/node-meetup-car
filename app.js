var serialPort = require('serialport');

serialPort.list(function(err, ports) {
	ports.forEach(function(port) {
		console.log(port.comName);
		console.log(port.pnpId);
		console.log(port.manufacturer);
	});
});


var SerialPort = serialPort.SerialPort;
var port = new SerialPort('/dev/cu.usbserial-A9007LnC', {}, false);

port.open(function(err) {
	if (err) {
		return console.log('Error opening port: ', err.message);
	}

	port.on('data', function(data) {
		console.log('Data: ' + data);

		setTimeout(port.write('s'), 1000);
	});

	// errors will be emitted on the port since there is no callback to write
	port.write('f');
});
