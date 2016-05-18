import {Serial} from './Serial';
import {Socket} from './Socket';

let serial: Serial = new Serial();

serial.onReady
	.subscribe(port => {
		/**
		 * #1 - Quando o transmissor estiver pronto, irá emitir um comando "Ready", este por suz vez é interpretado pela
		 * biblioteca Serial, e emite um evento onReady.
		 * Neste momento estamos prontos para abrir uma conexão socket.
		 */

		/*
	   socket.onOpen
		   .subscribe(() => {
		   	
			   #2 - Quando a conexão for estabelecida, devemos nos inscrever no servidor, seguindo o protocolo, enviando um comando "subscribePI".
			   Para isto, devemos enviar um comando ao servidor através do socket, utilizando um object com a assinatura {cmd: any}.
			   Lembre-se, apesar de estarmos enviando um objeto, este deve ser transformato em string, byte, ou blob antes de ser enviado.
		   });
	   */

		/*
		socket.onMessage
			.subscribe(data => {
				 #3 - Por último, a parte mais importante do código, onde vamos receber as mensagens e manipula-las de acordo
				 com o protocolo estabelecido no firmware do carrinho, no qual:

				 front => f
				 stop => s
				 left => l
				 right => r

				 Os comandos para o carrinho serão enviados via serial para o arduino.

				 Uma dica: as vezes o transmissor de radio frequencia falha, é importante garantirmos a entrega pelo menos
				 do comando stop. Como? Criando chamadas redundantes uma vez que não temos garantia de entrega.

				 Mais uma dica: Ao receber uma mensagem, ela pode ser exaamente igual a anterior, para não fragmentar a porta serial
				 com mensgens redundantes é possível filtra-las e acordo com sua predecessora usando .distinctUntilChanged().
			});
		*/
	});



