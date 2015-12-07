(function(){
	'use strict';
	
	function showComponents(locale){
		console.log("\n");
		Object.keys(locale).map(function(key){
			console.log(key + " : " + locale[key]);
			if (key === "RightNow"){
				console.log("----------------------------------");
			}
		});
		console.log("-------------------------------------\n");
	}
	
	
	var moment = require('moment');
	
	function getLocaleData(){
		var now = moment();
	
		var locale = {
			RightNow: now.format('llll'),
			year: now.year(),
			month: now.month(),
			day: now.day(),
			hour: now.hour(),
			minute: now.minute(),
			second: now.second()
		};
		return locale;
	}
	
	setInterval(function(){
		showComponents(getLocaleData());
	}, 1000);
	
	//var CoapClient = require('./CoapClient');
    //CoapClient.command();
})();
