// CoAP Server

(function(){
	"use strict";
	var clear = require('clear');
    clear();
	var coap = require('coap');
	var server = coap.createServer();
	
	server.on('request', function(req, res){
		console.log("Request received");
		console.log(req.method)
		res.end("Request received");
	});
	server.listen(function(){
		console.log("Listening @ :: " + 5683);
	});
})();