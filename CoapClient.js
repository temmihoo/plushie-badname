// CoapClient

'use strict';

module.exports.command = function(){
	var Coap = require('./Coap');
	var params = {
		method: 'put',
		pathname: 'leds',
		confirmable: true
	};
	var request = Coap.createRequest(params);
	request.send();
}
