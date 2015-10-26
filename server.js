/* jshint node: true, esnext: true */

'use strict';

console.log("jee jee jeesus tulee oletko valmis viritä psalmis");

while (true) {

// CoAP Server
    (function(){
        var clear = require('clear');
        clear();
        var coap = require('coap');
        var server = coap.createServer();
        
        server.on('request', function(req, res){
            console.log("Request received");
            console.log(JSON.stringify(req, null, 4))
            
            var buf = req['_packet']['payload'];
            console.log("Buffer type :: " + typeof buf);
            buf = JSON.parse(JSON.stringify(buf));
            console.log("Buffer contains :: " + buf);
            var colour_r = buf['data'][0];
            var colour_g = buf['data'][1];
            var colour_b = buf['data'][2];
            console.log("Colour R :: " + colour_r);
            console.log("Colour G :: " + colour_g);
            console.log("Colour B :: " + colour_b);
            res.end("Request received");
        });
        server.listen(function(){
            console.log("Listening @ :: " + 5683);
        });
    })();
}
