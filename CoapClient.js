// CoapClient

'use strict';
let querystring = require('querystring');

process.stdin.resume();
process.stdin.setEncoding('utf8');

module.exports.command = function(){
	var Coap = require('./Coap');
	var params = {
		method: 'put',
		pathname: 'leds',
		confirmable: true,
        hostname: '10.1.1.38'
	};

	//Getting RGB value from user here using this string format= "nnn nnn nnn" nnn=000->255 
  	var util = require('util');
	process.stdin.on('data', function (text) {	
    var dataRGB=formatString(text);
    console.log(dataRGB);
    var request = Coap.createRequest(params,dataRGB);
	request.send();
  	});

  	function formatString(str) {
		var red = str.slice(0, 3);
	    var green = str.slice(4, 7);
	    var blue = str.slice(8, 11);
        var formatRGB = querystring.stringify( { r: red, g:green, b:blue });
	    return formatRGB;
	}
}