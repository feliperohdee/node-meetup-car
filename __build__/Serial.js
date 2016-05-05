"use strict";
var serialport = require('serialport');
var rxjs_1 = require('rxjs');
var Serial = (function () {
    function Serial() {
        var _this = this;
        this.onData = new rxjs_1.Subject();
        serialport.list(function (err, ports) {
            if (err) {
                console.error(err);
            }
            _this.portProps = ports.find(function (port) { return port.manufacturer === 'FTDI'; });
            _this.port = new serialport.SerialPort(_this.portProps.comName, {
                parser: serialport.parsers.readline('\n')
            }, false);
            _this.port.open(function (err) {
                if (err) {
                    return _this.onData.error(err);
                }
                console.log('serial was openned');
                rxjs_1.Observable.fromEvent(_this.port, 'data')
                    .subscribe(_this.onData);
            });
        });
        // setup ready observable
        this.onReady = this.onData
            .filter(function (data) { return data.trim() === 'Ready'; })
            .map(function () { return _this.port; });
    }
    /**
     * send data through serial
     * @param {string} data
     */
    Serial.prototype.send = function (data) {
        this.port.write(data);
    };
    return Serial;
}());
exports.Serial = Serial;
