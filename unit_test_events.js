(function(){
	var fs = require("fs");
	var assert = require("assert");
	
	describe("JSON Data", function(){
		var json_data = fs.readFileSync("events.json", "utf8");
		var isValidJSON = false;
		
		it("Is valid JSON", function(){
			assert.equal(true, (function(json_data){
				try {
					var json_obj = JSON.parse(json_data);
					
					describe("Events", function(){
						it("Is an array", function(){
							assert.equal(true, (json_obj.events instanceof Array))
						});
						
						it("Is not empty", function(){
							assert.equal(true, (json_obj.events.length > 0));	
						});
						
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
							console.log(eventsAreValid);
							assert.equal(-1, eventsAreValid.indexOf(false));
						})
					});
					
					return true;
				} catch(e) {
					return false;
				}
			})(json_data));
		});
	});
})();