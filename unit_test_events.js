(function(){
	var fs = require('fs');
	var assert = require('assert');
	
	describe("JSON Data", function(){
		var json_data = fs.readFileSync('events.json', 'utf8');
		var isValidJSON = false;
		
		// Check for valid JSON
		it("Is valid JSON", function(){
			assert.equal(true, (function(){
				try {
					var json_obj = JSON.parse(json_data);
					
					describe("Events", function(){
						
						// Check for array
						it("Is an array", function(){
							assert.equal(true, (function(json_obj){
								var isArray = json_obj.events instanceof Array;
								
								if (isArray){
									describe("Events Array", function(){
										
										// Check for empty array
										it("Is not empty", function(){
											assert.equal(true, (function(){
												var isNotEmpty = json_obj.events.length > 0;
												
												if (isNotEmpty){
													describe("Events array not empty", function(){
														it("Has valid events", function(){
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
														});
													});
												}
												return isNotEmpty;
											})());	
										});
									});
								}
								return isArray;
							})(json_obj));
						});
					});
					
					return true;
				} catch(e) {
					return false;
				}
			})());
		});
	});
})();