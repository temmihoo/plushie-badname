(function(){
    // For PubSub.js
    "use strict";
    var assert = require("assert");
    var ps = require(".././PubSub").pubsub();
    
    describe("Topics", function(){
        var topics = ps.getTopics();
        it ("Is an empty object", function(){
            assert.equal(true, (Object.keys(topics).length === 0))
        });
    });
    
    describe("Subscription", function(){
        var topics = ps.getTopics();
        var subscriptionKey = "Testing";
        var token = null;
        
        before(function(){
            token = ps.subscribe(subscriptionKey, function(){
                console.log("Subscribed to 'Tesing'")
            });
        });
        
        it ("After subscription, Has " + subscriptionKey, function(){
            var subscriptionFound = topics[subscriptionKey];
            assert.equal(true, ((typeof subscriptionFound) !== 'undefined'))
        });
        
        it ("After unsubscription, does not have " + subscriptionKey, function(){
            ps.unsubscribe(token);
            assert.equal(true, ((typeof subscriptionFound) === 'undefined'));
        });
    });
    
    describe("Publish", function(){
        var subscriptionKey = "Increament counter";
        
        before(function(){
            var token = ps.subscribe(subscriptionKey, function(counterObj){
                counterObj.count ++;
            });
        });
        
        it ("Increaments a counter", function(){
            var counterObj = {count: 0};
            ps.publish(subscriptionKey, counterObj);
            assert.equal(true, (counterObj.count === 1));
        });
    });
})();