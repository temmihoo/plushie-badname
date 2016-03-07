(function(){
    // For Calendar.js
    
    'use strict';
    
    describe("Calendar", function(){
        var assert = require('assert');
        var moment = require('moment');
        var calendar = require('.././Calendar');
        var PeriodicTask = require('periodic-task');
        var cal = calendar.getCalendar(true);
        var now = moment();
        var anotherNow = now.clone();
        
        var delay = 100;
        
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
            var task = cal.createPeriodicTask(cal.scanEvents, [], delay);
            
            it("Is valid @just_in_time", function(){
                assert.equal(true, (task instanceof PeriodicTask));
            });
        });
        
        describe("Scan running events", function(){
            var events = null;
            
            before(function(done){
                events = cal.getEvents(this.timeout() - 2000);
                var task = cal.createPeriodicTask(cal.scanRunningEvents, [events], delay);
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
                var task = cal.createPeriodicTask(cal.scanEvents, [events, running_events, false], delay);
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
                var task = cal.createPeriodicTask(cal.scanEvents, [events, running_events, true], delay);
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