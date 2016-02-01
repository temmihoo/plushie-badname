(function(){
    // For Event.js
    'use strict';
    
    describe("Events", function(){
        var assert = require('assert');
        var moment = require('moment');
        var eventsEmitter = require('.././Event');
        var events = eventsEmitter.emitEvents(moment());
        
        it("Is an array @just_in_time", function(){
            assert.equal(true, events instanceof Array);
        });
        
        it("Is not empty @just_in_time", function(){
            assert.equal(true, (events.length !== 0)); 
        });
    });
})();