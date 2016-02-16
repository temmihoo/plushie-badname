/*
** Filename - 'calendar.js'
** Author - 'Sayantan Hore'
** Created on - '07.12.2015'
** Description - 'This file holds the calendar events to listen to and calls CoAP client with required params'
*/

module.exports.getCalendar = function(__DEBUG__){
    'use strict';
    
    var moment = require('moment');
    var PeriodicTask = require('periodic-task');
    
    // Delay should be less than a second, because our events are separated by minimum a second
    var delay = 100;
    var eventsToken = null;
    var periodicEventGenerator = null;
    
    /*
    ** Checks if a scheduled event has occured by comparing the moment of the event with a new moment created just now
    ** Parameters checked : second, minute, hour, day, month, year
    */
    function checkForEqualMoment(now, recordedMoment){
        var isEqualMoment = 
            now.isSame(recordedMoment, 'second') 
                && now.isSame(recordedMoment, 'minute') 
                && now.isSame(recordedMoment, 'hour') 
                && now.isSame(recordedMoment, 'day') 
                && now.isSame(recordedMoment, 'month') 
                && now.isSame(recordedMoment, 'year');
        
        return isEqualMoment;
    };
    
    function createPeriodicTask(callback, args){
        var obj = {};
        var task = new PeriodicTask(delay, callback, obj, args);
        obj.stop = task.stop.bind(task);
        return task;
    };
    
	function getEvents(maxDelay){
        var maxDelay = maxDelay || 8000;
        var event = require('./Event');
        var events = event.emitEvents(moment(), (parseInt(maxDelay) / 1000));
        return events;
    };
    
    function scanRunningEvents(args){
        var events = args[0];
        events.map(function(event, index){
            if (checkForEqualMoment(moment(), moment(event.end.time))){
                events.splice(index, 1);
            }
        });
        if (events.length === 0){
            this.stop();
        }
    };
    
    function scanEvents(args){
        var events = args[0];
        var running_events = args[1];
        var __FLAG__Running = args[2];
        
        events.map(function(event, index){
            if (checkForEqualMoment(moment(), moment(event.begin.time))){
                events.splice(index, 1);
                running_events.push(event);
                if ((__FLAG__Running === true) && (running_events.length === 1)){
                    var task = createPeriodicTask(scanRunningEvents, [running_events]);
                    task.run();
                }
            }
        });
        if (events.length === 0){
            this.stop();
        }
    };
    
    function monitorEvents(events){
        var running_events = [];
        var task = createPeriodicTask(scanEvents, [events, running_events, true]);
        task.run();
    };
    
    function publishEvents(args){
        var pubsub = args[0];
        var events = getEvents();
        pubsub.publish("generateEvents", events);
    };
    
    function subscribeEvents(pubsub){
        return pubsub.subscribe("generateEvents", monitorEvents);
    };
    
    function stop(pubsub){
        periodicEventGenerator.stop();
        pubsub.unsubscribe(eventsToken);  
    };
    
    function start(pubsub){
        eventsToken = subscribeEvents(pubsub);
        periodicEventGenerator = createPeriodicTask(publishEvents, [pubsub]);
    };
    
    var rtrn_obj = null;
    
    if (__DEBUG__){
        rtrn_obj = {
            checkForEqualMoment: checkForEqualMoment,
            getEvents: getEvents,
            createPeriodicTask: createPeriodicTask,
            scanEvents: scanEvents,
            scanRunningEvents: scanRunningEvents,
            monitorEvents: monitorEvents
        }
    }
    else{
        rtrn_obj = {
            start: start,
            stop: stop,
            getEvents: getEvents,
            monitorEvents: monitorEvents
        }
    }
    
    return rtrn_obj;
}
