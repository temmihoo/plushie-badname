// Coap client

"use strict";


(function(){
    var coapOjb = require("coap");
    var coapMsg = {
        method: 'put',
        hostname: parsed_url.hostname,
        pathname: 'leds',
        confirmable: true
    };
    
    var request = coapOjb.request(coapMsg);
    var querystring = require('querystring');
    var parsed = querystring.parse("r=0&g=0&b=0");
    
    var colour_r = parsed.r;
    var colour_g = parsed.g;
    var colour_b = parsed.b;

    var buf = new Buffer(3);
    buf.writeUInt8(parseInt(colour_r), 0);  
    buf.writeUInt8(parseInt(colour_g), 1);
    buf.writeUInt8(parseInt(colour_b), 2);
    request.write(buf);
    request.on('response', function(res){
        console.log("Response code :: " + res.code)
    });
    request.end();
    
})();
