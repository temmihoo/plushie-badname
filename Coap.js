// This module holds the CoAP server and client, callable from any valid javascript module

'use strict';
	
// Server
module.exports.createServer = function(){
	var coap = require('coap');
	var server = coap.createServer();
	
	server.on('request', function(req, res){
		console.log("Request received");
		var buf = req['_packet']['payload'];
		buf = JSON.parse(JSON.stringify(buf));
		var colour_r = buf['data'][0];
		var colour_g = buf['data'][1];
		var colour_b = buf['data'][2];
		console.log("Colour R :: " + colour_r);
		console.log("Colour G :: " + colour_g);
		console.log("Colour B :: " + colour_b);
		res.end("Response sent");
	});
	
	return {
		server: server,
		running: false,
		isRuning: function(){
			return this.running;
		},	
		setRunning: function(status){
			this.running = status;
		},
		run: function(f, interval){
			var that = this;
			this.server.listen(function(f, interval){
				console.log("Listening @ :: " + 5683);
				that.setRunning(true);
				setTimeout(f, interval);
			});
		}
	};
},

// Client request
module.exports.createRequest = function(params,value){
	var coapOjb = require("coap");
	var coapMsg = {
		method: params.method,
		//hostname: parsed_url.hostname,
		//pathname: 'leds',
		pathname: params.pathname,
		confirmable: params.confirmable,
	};
	var caopVal=value;
	
	var request = coapOjb.request(coapMsg);
	var querystring = require('querystring');
	var parsed = querystring.parse(caopVal);
	
	var colour_r = parsed.r;
	var colour_g = parsed.g;
	var colour_b = parsed.b;

	var buf = new Buffer(3);
	buf.writeUInt8(parseInt(colour_r), 0);  
	buf.writeUInt8(parseInt(colour_g), 1);
	buf.writeUInt8(parseInt(colour_b), 2);
	request.write(buf);
	
	request.on('response', function(res){
		console.log("Response code :: " + res.code)
		console.log("Response :: " + res)
	});
		
	return {
		send: function(){
			request.end();
		}
	}
}
