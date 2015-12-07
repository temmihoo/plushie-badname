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
	
	var checkInterval = 5000;
	
	var moment = require('moment');
	
	function getLocaleData(now){
	
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
	
	function checkIfEventHasOccurred(now, recordedMoment){
		if (now.second() !== recordedMoment.second()){
			return false;
		}
		else if(now.minute() !== recordedMoment.minute()){
			return false;
		}
		else if(now.hour() !== recordedMoment.hour()){
			return false;
		}
		else if(now.day() !== recordedMoment.day()){
			return false;
		}
		else if(now.month() !== recordedMoment.month()){
			return false;
		}
		else if(now.year() !== recordedMoment.year()){
			return false;
		}
		else{
			return true;
		}
	}
	
	var now = moment();
	showComponents(getLocaleData(now));
	
	var intervals = [10, 15, 20];
	
	var events = intervals.map(function(value){
		return now.clone().add(value.toString(), 'seconds'); 
	});
	
	events.forEach(function(element, index){
		setInterval(function(){
			if (checkIfEventHasOccurred(moment(), element)){
				showComponents(getLocaleData(element));
			}
		}, checkInterval);
	});

	//var CoapClient = require('./CoapClient');
    //CoapClient.command();
})();
