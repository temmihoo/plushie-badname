(function(){
    'use strict';
    
    /*
    ** Reads a .json file and returns a json object (for events)
    */
    function read_jsonfile(filename){
        var events = [];
        try {
            events = JSON.parse(fs.readFileSync(filename, 'utf-8')).events;
        } catch(e) {
            console.log(e);
        }
        return events;
    }
    
    /*
    ** Checks if a scheduled event has occured by comparing the moment of the event with a new moment created just now
    ** Parameters checked : second, minute, hour, day, month, year
    */
    function checkIfEventHasOccurred(now, recordedMoment){
        return now.isSame(recordedMoment, 'second') && now.isSame(recordedMoment, 'minute') && now.isSame(recordedMoment, 'hour') && now.isSame(recordedMoment, 'day') && now.isSame(recordedMoment, 'month') && now.isSame(recordedMoment, 'year');
    }
    
    /*
    ** Requires moment
    */
    var moment = require('moment');
    var PeriodicTask = require('periodic-task')
    var fs = require('fs');
    var delay = 1000;
    var running_events = [];
    
    /*
    ** Creates a task for watching running events
    */
    var task_watch_running_events = new PeriodicTask(delay, function(){
        //console.log("Scanning through running events\n");
        // Check each event for one to finish
        running_events.map(function(running_event, index){
            console.log(running_event.id + " is running\n");
            if (checkIfEventHasOccurred(moment(), moment(running_event.end.time))){
                console.log(running_event.id + " ended\n");
                
                // Remove a running event from running_events when it finishes
                running_events.splice(index, 1);
                console.log(running_event.id + " removed from running_events\n");
                if (running_events.length === 0){
                    // Stop monitoring running_events when it gets the first event
                    task_watch_running_events.stop();
                }
            }
        });
    });
    
    /*
    ** Creates a task for watching events
    */
    var task_watch_events = new PeriodicTask(delay, function(){
        //console.log("Scanning through ready events\n");
        // Check each event for one to start
        events.map(function(event, index){
            if (checkIfEventHasOccurred(moment(), moment(event.begin.time))){
                // Push an event into running_events when it starts
                running_events.push(event);
                console.log(event.id + " started\n");
                if (running_events.length === 1){
                    // Start monitoring running_events when it gets the first event
                    task_watch_running_events.run();
                }
                
                // Remove an event from events when it starts
                events.splice(index, 1);
                console.log(event.id + " removed from events\n")
                if (events.length === 0){
                    // Stop monitoring events when it becomes empty
                    task_watch_events.stop();
                }
            }
        });
    });
    
    // Read events ready to be triggered
    var events = read_jsonfile('periodic_events.json');
    
    if (events.length > 0){
         // Start monitoring events
        task_watch_events.run()
    }
})();