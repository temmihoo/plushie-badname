(function(){
	var fs = require('fs');
	var assert = require('assert');
	
	// Ckecking for valid events in Events array
	function hasValidEvents(json_obj){
		var eventsAreValid = json_obj.events.map(function(element){
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
		//console.log(eventsAreValid);
		assert.equal(-1, eventsAreValid.indexOf(false));
	}
	
	// Checking if Events array is empty
	function isNotEmptyArray(json_obj){
		assert.equal(true, (function(){
			var isNotEmpty = json_obj.events.length > 0;
			
			if (isNotEmpty){
				describe("Events array not empty", function(){
					it("Has valid events", hasValidEvents.bind(null, json_obj));
				});
			}
			return isNotEmpty;
		})());	
	}
	
	// Checking if Events is a valid array
	function isAnArray(json_obj){
		assert.equal(true, (function(json_obj){
			var isArray = json_obj.events instanceof Array;
			
			if (isArray){
				describe("Events Array", function(){
					
					// Check for empty array
					it("Is not empty", isNotEmptyArray.bind(this, json_obj));
				});
			}
			return isArray;
		})(json_obj));
	}
	
	// Checking if json_data is a valid json object
	function isValidJSON(json_data){
		assert.equal(true, (function(){
			try {
				var json_obj = JSON.parse(json_data);
				
				describe("Events", function(){
					
					// Check for array
					it("Is an array", isAnArray.bind(null, json_obj));
				});
				
				return true;
			} catch(e) {
				return false;
			}
		})());
	}
	
	
	describe("JSON Data", function(){
		var json_data = fs.readFileSync('events.json', 'utf8');
		
		// Check for valid JSON
		it("Is valid JSON", isValidJSON.bind(null, json_data));
	});
})();
