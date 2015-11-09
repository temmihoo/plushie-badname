// CoapClient

'use strict';

module.exports.command = function(){
	var Coap = require('./Coap');
	var params = {
		method: 'put',
		pathname: 'leds',
		confirmable: true
	};
	var request = Coap.createRequest(params, 'r=255&g=255&b=0');

	request.send();
}
