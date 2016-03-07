// Server

var pubsub = require('./PubSub');

(function(){
    'use strict';
	
    var clear = require('clear');
	clear();
    
    var fs = require('fs');
    var ps = require("./PubSub").pubsub();
    
    var CoapServer = require('./CoapServer');
    var calendar = require('./Calendar');
    var cal = calendar.getCalendar();
    
    process.on('SIGINT', function(){
        console.log("SIGINT received, process " + process.pid + " terminating ...\n");
        fs.unlinkSync("./temp/pid.txt");
        cal.stop(ps);
        process.exit(0);
    });
    
    fs.writeFileSync("./temp/pid.txt", process.pid, 'utf8');
    
    //CoapServer.serv();
    cal.start(ps);
})();
