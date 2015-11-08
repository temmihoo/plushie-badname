// CoapServer

'use strict';

module.exports.serv = function(){
	var Coap = require('./Coap');
	var serverObj;
	
	(function runServer(){
		if (typeof serverObj === 'undefined'){
			console.log("Server undefined")
			try{
				serverObj = Coap.createServer();
				console.log("Server instance created");
			}
			catch(e){
				console.log("Error creating server instance")
			}
			
		}
		if (!serverObj.isRunning){
			console.log("Server is not running");
			serverObj.run(runServer, 2000);
		}
	})();
}
