let ws: WebSocket = new WebSocket('ws://node-remote-server.herokuapp.com');
let text: Element = document.querySelector('h1');
let send: Function = cmd => {
	ws.send(JSON.stringify({ cmd }));
	text.innerHTML = cmd;
};

ws.onopen = () => {
	window.addEventListener('keydown', e => {
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

	window.addEventListener('keyup', e => {
		send('stop');
	});
}
