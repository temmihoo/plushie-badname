// Server

(function(){
    'use strict';
	
    var clear = require('clear');
	clear();
	
    var Util = require('./Util');
    var util = Util.util();
    var fs = require('fs');
    
    process.on('SIGINT', function(){
        console.log("SIGINT received, process " + process.pid + " terminating ...\n");
        fs.unlinkSync("./temp/pid.txt");
        process.exit(0);
    });
    
    fs.writeFileSync("./temp/pid.txt", process.pid, 'utf8');
    
    var CoapServer = require('./CoapServer');
    CoapServer.serv();
})();
