(function(){
    'use strict';
    
    var assert = require('assert');
    var moment = require('moment');
    var eventsEmitter = require('./Event');
    var calendar = require('./Calendar');
    var PeriodicTask = require('periodic-task');
    
    
    // For Event.js
    describe("Events", function(){
        var events = eventsEmitter.emitEvents(moment());
        it("Is an array @just_in_time", function(){
            assert.equal(true, events instanceof Array);
        });
        
        it("Is not empty @just_in_time", function(){
            assert.equal(true, (events.length !== 0)); 
        });
    });
    
    // For Calendar.js
    describe("Calendar", function(){
        var cal = calendar.getCalendar(true);
        var now = moment();
        var anotherNow = now.clone();
        
        describe("Two same moments @just_in_time", function(){
            it("Are equal", function(){
                assert.equal(true, cal.checkForEqualMoment(now, anotherNow)); 
            });
        });
        
        describe("Events", function(){
            var events = cal.getEvents(10000);
            
            it("Is an array @just_in_time", function(){
                assert.equal(true, events instanceof Array);
            });
            
            it("Is not empty @just_in_time", function(){
                assert.equal(true, (events.length !== 0));
            });
        });
        
        describe("Task", function(){
            var task = cal.createPeriodicTask(cal.scanEvents, []);
            
            it("Is valid @just_in_time", function(){
                assert.equal(true, (task instanceof PeriodicTask));
            });
        });
        
        describe("Scan running events", function(){
            var events = null;
            
            before(function(done){
                events = cal.getEvents(this.timeout() - 2000);
                var task = cal.createPeriodicTask(cal.scanRunningEvents, [events]);
                task.run();
                setTimeout(done, this.timeout() - 1000);
            });
            it ("Empties the events array @delayed", function(){
                assert.equal(true, (events.length === 0));
            });
        });
        
        describe("Scan events", function(){
            var events = null;
            var running_events = null;
            
            before(function(done){
                events = cal.getEvents(this.timeout() - 2000);
                running_events = [];
                var task = cal.createPeriodicTask(cal.scanEvents, [events, running_events, false]);
                task.run();
                setTimeout(done, this.timeout() - 1000);
            });
            it ("Empties the events array @delayed", function(){
                assert.equal(true, (events.length === 0));
            });
            
            it ("Places events into running_events array @delayed", function(){
                assert.equal(true, (running_events.length > 0));
            });
        });
        
        describe("Scan events and running events together", function(){
            var events = null;
            var running_events = null;
            
            before(function(done){
                events = cal.getEvents(this.timeout() - 2000);
                running_events = [];
                var task = cal.createPeriodicTask(cal.scanEvents, [events, running_events, true]);
                task.run();
                setTimeout(done, this.timeout() - 1000);
            });
            
            it ("Empties the events array @delayed", function(){
                assert.equal(true, (events.length === 0));
            });
            
            it ("Empties the running events array after events expire @delayed", function(){
                assert.equal(true, (running_events.length === 0));
            });
        });
        
        describe("Monitor events", function(){
            var events = null;
            
            before(function(done){
                events = cal.getEvents(this.timeout() - 2000);
                cal.monitorEvents(events);
                setTimeout(done, this.timeout() - 1000);
            });
            
            it ("Empties the events array @delayed", function(){
                assert.equal(true, (events.length === 0));
            });
        });
    });
})();
