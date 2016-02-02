// Server

(function(){
    'use strict';
	
    var clear = require('clear');
	clear();
	
    var Util = require('./Util');
    var util = Util.util();
    
    util.writeFile("./temp/pid.txt", process.pid);
    
    var CoapServer = require('./CoapServer');
    CoapServer.serv();
})();
