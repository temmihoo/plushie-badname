// This module creates events for calendar

module.exports.emitEvents = function(now, maxDelay){
    'use strict';
    
    var events = [];
    var no_of_events = 0;
    
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
    
    no_of_events = Math.floor(Math.random() * 10 + 1);
    
    for (var i = 0; i < no_of_events; i ++){
        var startAfter = setStartTimeInSecondsFromNow(5);
        var event = {
            id: generate_random_string(),
            begin: {
                time: now.clone().add(startAfter.toString(), 'seconds'),
                perform: function(){
                    console.log("Event starts");
                }
            },
            end: {
                time: now.clone().add((startAfter + 2).toString(), 'seconds'),
                perform: function(){
                    console.log("Event ends");
                }
            }
        };
        events.push(event);
    }
    return events;
}
