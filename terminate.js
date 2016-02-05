(function(){
    'use strict';
    
    var fs = require('fs');
    
    try {
        var running_pid = fs.readFileSync("./temp/pid.txt").toString();
        console.log("Termination request to process " + running_pid + " sent\n");
        process.kill(running_pid, 'SIGINT');
    }
    catch(e){
        if (e.code === "ENOENT"){
            console.log("No running process found.\n");
        }
    }
})();