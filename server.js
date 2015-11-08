// Server

(function(){
    'use strict';
	
    var clear = require('clear');
	clear();
	
    var CoapServer = require('./CoapServer');
    CoapServer.serv();
})();
