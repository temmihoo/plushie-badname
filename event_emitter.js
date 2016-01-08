var fs = require('fs');
var moment = require('moment');

(function emit_events(now){
    var events = [];
    
    function generate_random_string(){
        return Math.random().toString(36).slice(2); 
    }
    
    
    var startTime = now.clone().add('25', 'seconds');
    var endTime = now.clone().add('30', 'seconds');
    
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
    
    var startTime = now.clone().add('27', 'seconds');
    var endTime = now.clone().add('40', 'seconds');
    
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
    
    fs.writeFile('periodic_events.json', JSON.stringify({"events": events}, null, 4), 'utf8', function(err){
        if (err){
            console.log(err);
            return;
        }
        console.log("'events' >> 'periodic_events.json'");
    })
})(moment());
