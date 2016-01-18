// This module creates events for calendar

module.exports.emitEvents = function(now, maxDelay){
    'use strict';
    
    var events = [];
    
    function generate_random_string(){
        return Math.random().toString(36).slice(2); 
    }
    
    function setStartTimeInSecondsFromNow(dflt){
        var startAfter = null;
        if (typeof maxDelay !== 'undefined'){
            var startAfter = Math.floor(Math.random() * (maxDelay - 2) + 1);
        }
        else{
            startAfter = dflt;
        }
        
        return startAfter;
    }
    
    var startAfter = setStartTimeInSecondsFromNow(5);
    
    var startTime = now.clone().add(startAfter.toString(), 'seconds');
    var endTime = now.clone().add((startAfter + 2).toString(), 'seconds');
    
    var event = {
        id: generate_random_string(),
        begin: {
            time: startTime
        },
        end: {
            time: endTime
        }
    };
    
    events.push(event);
    
    var startAfter = setStartTimeInSecondsFromNow(6);
    
    var startTime = now.clone().add(startAfter.toString(), 'seconds');
    var endTime = now.clone().add((startAfter + 2).toString(), 'seconds');
    
    var event = {
        id: generate_random_string(),
        begin: {
            time: startTime
        },
        end: {
            time: endTime
        }
    };
    
    events.push(event);
    
    return events;
}