
(function(){
	var assert = require("assert");
	var moment = require('moment');
	var calendar = require('./calendar');
	
	describe("Moment", function(){
		it("Is a valid moment", function(){
			var aNewMoment = calendar.createNewMoment();
			assert.equal(true, aNewMoment.isValid());
		})
	});
	
	describe("Events", function(){
		var aNewMoment = calendar.createNewMoment();
		var events = calendar.createEvents(aNewMoment);
		
		it("Is an array", function(){
			assert.equal(true, (events.constructor === Array));
		});
		
		it("Is not empty", function(){
			assert.equal(true, (events.length > 0));
		});
		
		it("Has valid events", function(){
			var eventsAreValid = events.map(function(element){
				if (element.hasOwnProperty('flash')){
					if (element.hasOwnProperty('startTime')){
						if (element.flash === false){
							if (element.hasOwnProperty('duration')){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							return true;
						}
					}
					else{
						return false;
					}
				}
				else{
					return false;
				}
			});
			console.log(eventsAreValid);
			assert.equal(-1, eventsAreValid.indexOf(false));
		})
	});
})();
