module.exports.pubsub = function(){
    "use strict";
    var ps = {},
    topics = {},
    subId = -1;
    
    ps.publish = function(topic, args){
        if (!topics[topic]){
            console.log("No subscriber found\n");
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        
        while ((len --) > 0){
            subscribers[len].func(args);
        }
        
        return this;
    };
    
    ps.subscribe = function(topic, func){
        if (!topics[topic]){
            topics[topic] = [];
        }
        
        var token = (++subId).toString();
        
        topics[topic].push({
            token: token,
            func: func
        });
        
        return token;
    };
    
    ps.unsubscribe = function(token){
        for (var topic in topics){
            if (topics[topic]){
                for (var i = 0; i < topics[topic].length; i++){
                    if (topics[topic][i].token === 'token'){
                        topics[topic].splice(i, 1);
                        return token;
                    }
                }
            }
        }
    };
    
    ps.getTopics = function(){
        return topics;
    };
    
    return ps;
};
