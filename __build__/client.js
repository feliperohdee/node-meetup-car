var ws = new WebSocket('ws://node-remote-server.herokuapp.com');
var text = document.querySelector('h1');
var send = function (cmd) {
    ws.send(JSON.stringify({ cmd: cmd }));
    text.innerHTML = cmd;
};
ws.onopen = function () {
    window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 38:
                send('front');
                break;
            case 40:
                send('stop');
                break;
            case 37:
                send('left');
                break;
            case 39:
                send('right');
                break;
        }
    });
    window.addEventListener('keyup', function (e) {
        send('stop');
    });
};
