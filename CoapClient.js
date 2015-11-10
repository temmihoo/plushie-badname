// CoapClient 

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf8');

module.exports.command = function(){
	var Coap = require('./Coap');
	var params = {
		method: 'put',
		pathname: 'leds',
		confirmable: true,
	};

	//Getting RGB value from user here using this string format= r=0&g=255&b=0
  	var util = require('util');
	process.stdin.on('data', function (text) {	
    var request = Coap.createRequest(params,text);
	request.send();
  	});
}