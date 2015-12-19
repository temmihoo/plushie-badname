/*
** Filename - 'calendar.js'
** Author - 'Sayantan Hore'
** Created on - '07.12.2015'
** Description - 'This file holds the calendar events to listen to and calls CoAP client with required params'
*/

'use strict';
/*
** Declares a default interval value
*/
var checkInterval = 5000;

/*
** Requires moment
*/
var moment = require('moment');

/*
** Creates a new moment right now
*/
module.exports.createNewMoment = function(){
	return moment();
}

/*
** Creates new hard coded events
*/
module.exports.loadEvents = function(now){
	var fs = require('fs');
	var events = [];
	try {
		events = JSON.parse(fs.readFileSync('events.json', 'utf8')).events;
	} catch(e) {
		console.log(e);
	}
	return events;
}

/*
** Checks if a scheduled event has occured by comparing the moment of the event with a new moment created just now
** Parameters checked : second, minute, hour, day, month, year
*/
function checkIfEventHasOccurred(now, recordedMoment){
	return now.isSame(recordedMoment, 'second') && now.isSame(recordedMoment, 'minute') && now.isSame(recordedMoment, 'hour') && now.isSame(recordedMoment, 'day') && now.isSame(recordedMoment, 'month') && now.isSame(recordedMoment, 'year');
}

/*
** Schedules events
*/
module.exports.scheduleEvents = function(events){
	events.forEach(function(element, index){
		setInterval(function(){
			if (checkIfEventHasOccurred(moment(), element.startTime)){
				element.triggered = true;
				console.log("----------------------------------");
				console.log("Event " + element.name + " started");
				console.log(JSON.stringify(element, null, 2));
				setTimeout(function(){
					console.log("Event " + element.name + " ended");
					console.log("----------------------------------");
				}, element.duration * 1000);
			}
		}, checkInterval);
	});
}

/*
** Extracts date and time components and encapsulates in an object
*/
module.exports.getLocaleData = function(momentObj){
	if (!momentObj.isValid()){
		throw TypeError;
	}
	else{
		var locale = {
			RightNow: momentObj.format('llll'),
			year: momentObj.year(),
			month: momentObj.month(),
			day: momentObj.day(),
			hour: momentObj.hour(),
			minute: momentObj.minute(),
			second: momentObj.second()
		};
		return locale;
	}	
}
