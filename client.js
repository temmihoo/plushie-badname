// Client

(function(){
    'use strict';
    
    var CoapClient = require('./CoapClient');

    var requestParameters = {
        method: 'put',
        confirmable: true,
        hostName: '10.1.1.38',
        pathName: 'leds'
    };
    var requestPayload = {

    };

    CoapClient.command(requestParameters, requestPayload);
})();
