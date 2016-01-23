/*
** Filename - 'calendar.js'
** Author - 'Sayantan Hore'
** Created on - '07.12.2015'
** Description - 'This file holds the calendar events to listen to and calls CoAP client with required params'
*/

module.exports.getCalendar = function(){
    'use strict';
    
    var moment = require('moment');
    var PeriodicTask = require('periodic-task');
    var delay = 1000;
    var running_events = [];
    
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
    }
    
	function getEvents(maxDelay){
        var event = require('./Event');
        var events = event.emitEvents(moment(), (parseInt(maxDelay) / 1000));
        return events;
    }
    
    function scanEvents(events){
        events.map(function(event, index){
            if (checkForEqualMoment(moment(), moment(event.begin.time))){
                //console.log("Event " + event.id + event.begin.perform());
                running_events.push(event);
                if (running_events.length === 1){
                    var obj = {};
                    var task = new PeriodicTask(delay, scanRunningEvents, obj, running_events);
                    obj.stop = task.stop.bind(task);
                    //console.log("Event " + event.id + " started running, monitoring running events started");
                    task.run();
                }
                events.splice(index, 1);
            }
        });
        if (events.length === 0){
            //console.log("All events started, monitoring events stopped");
            this.stop();
        }
    }
    
    function scanRunningEvents(running_events){
        running_events.map(function(running_event, index){
            if (checkForEqualMoment(moment(), moment(running_event.end.time))){
                //console.log("Event " + running_event.id + running_event.end.perform());
                running_events.splice(index, 1);
            }
        });
        if (running_events.length === 0){
            //console.log("All running events ended, monitoring running events stopped");
            this.stop();
        }
    }
    
    function monitorEvents(events){
        var obj = {};
        var task = new PeriodicTask(delay, scanEvents, obj, events);
        obj.stop = task.stop.bind(task);
        task.run();
    }
    
    return {
        getEvents: getEvents,
        monitorEvents: monitorEvents
    }
}
