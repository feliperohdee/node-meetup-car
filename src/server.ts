import {createServer, Server} from 'http';
import {Observable} from 'rxjs';
import * as ws from 'ws';
import * as gpio from 'rpi-gpio';

let server: Server = createServer();
let wss: ws.Server = new ws.Server({ server });
let pi: Set<ws> = new Set<ws>();

server.listen(process.env.PORT || 9090);

/**
 * Emite um ping a cada 15s para todos clientes para manter a conexão ativa, depende de servidor para servidor
 */
Observable.interval(15000)
	.mapTo(wss)
	.subscribe(wss => {
		wss.clients.forEach(ws => {
			ws.send('ping');
		});
	});

/**
 * Quando um cliente connecta o servidor emite um evento 'connection'
 */
Observable.fromEvent<ws>(wss, 'connection')
	.do(ws => {
		console.log('client connected');
		ws.send('welcome to real time world!');
	})
	.mergeMap<any>(ws => {
		/**
		 * Observable que emite quando o socket emitir um evento 'close',
		 * Este observable só emite uma unica vez por cliente usando first()
		 */
		let onClose: Observable<any> = Observable.fromEvent(ws, 'close')
			.first()
			.do(() => {
				console.log('client removed');
				pi.delete(ws);
			});

			/**
			 * Recebe as mensagens do socket até que onClose ocorra
			 */
		return Observable.fromEvent(ws, 'message')
			.takeUntil(onClose)
			.map(data => ({ ws, data }));
	})
	.subscribe(response => {
		/**
		 * #1 - uma mensagem é passada através de um objeto response que possúi as propriedades ws: WebSocket, e data: string.
		 *	  Estes dados devem ser atribuídos para variáveis locais para serem manipulados.
		 */

		try {
		 /**
		  * #2 - A propriedade data, é uma string, e deve ser convertida para object, a propriedade contém outra sub-propriedade cmd,
		  * 	 que irá conter o comando que o carrinho deve atender
		  */
		} catch (e) { }

		/**
		 * #3 - Devemos abortar a ação se não houver um comando, isto é, a sub propriedade "cmd"
		 */

		 /**
		  * #4 - Esta é a parte fundamental do código, onde iremos manipular os comandos, e emissor e o receptor enviarão comandos dentro do nosso protocolo, é nosso papel
		  * 	 converter estes comandos em ações. Lembre-se, emissor é o browser ou qualquer cliente que requisita um comando, e nosso receptor é a raspberry que 
		  * 	 interpreta estes comandos e os passa ao carrinho.
		  * 	
		  *
		  * 	## A raspberry enviará dois tipos de comandos ao entrar na rede
		  * 		1. subscribePi - quando entrar na rede, devemos assegurar de persistir este cliente, para mais tarde podermos enviar comandos advindos do cliente.
		  * 		2. unsubscribePI - quando sair da rede, devemos remove-la a fim de não enviar mais comandos a ela.
		  *
		  * 	## O cliente enviará quatro tipos de comandos:
		  * 		1. front
		  * 		2. stop
		  * 		3. left
		  * 		4. right
		  * 	
		  */
	} /* Lembre-se de tratar os errors */);
