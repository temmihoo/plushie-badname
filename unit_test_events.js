(function(){
	var fs = require('fs');
	var assert = require('assert');
	var calendar = require('./Calendar');
	
	//var timeout = parseInt(process.argv[process.argv.indexOf('--timeout') + 1]);
	
	var cal = calendar.getCalendar();
	var events = null;
	
	// Observe events
	function observeArray(events){
		Array.observe(events, function(changes){
			console.log("Changed");
		});
	}
	
	// Check for a non-empty array
	function isNotEmpty(events){
		var notEmpty = events.length > 0;
		assert.equal(true, notEmpty);
	}
	
	// Check for a valid array
	function isAnArray(events){
		var isArray = events instanceof Array;
		assert.equal(true, isArray);
	}
	
	describe("Events, after created", function(){
		if (this.timeout() < 10000){
			console.log("Timeout has to be greater than 10000");
			process.exit();
		}
		events = cal.getEvents(this.timeout() - 2000);
		it("Is an array", isAnArray.bind(null, events));
		it("Is not empty", isNotEmpty.bind(null, events));
	});
	
	describe("Events, after monitoring started", function(){
		//var delayForDone = parseInt(this.timeout()) - 1000;
		var delayForDone = this.timeout() - 1000;
		
		before(function(){
			//observeArray(events);
			cal.monitorEvents(events);
		});
		
		it("Is empty", function(done){
			setTimeout(done, delayForDone);
			assert.equal(true, (events.length > 0));
		});
	});
})();
