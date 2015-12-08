/*
** Filename - 'calendar.js'
** Author - 'Sayantan Hore'
** Created on - '07.12.2015'
** Description - 'This file holds the calendar events to listen to and calls CoAP client with required params'
*/

(function(){
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
	function createNewMoment(){
		return moment();
	}
	
	/*
	** Creates new hard coded events
	*/
	function createEvents(){
		var events = [];
	
		events.push({
			name: 'BLINK_LED',
			flash: true,
			startTime: now.clone().add('5', 'seconds'),
			targetDevice: 'led',
			msg: 'Led lamp colour changes',
			triggered: false
		});
		events.push({
			name: 'GLOW_LED',
			flash: false,
			startTime: now.clone().add('10', 'seconds'),
			duration: 5,
			targetDevice: 'led',
			startMsg: 'Led lamp colour changes',
			endMsg: 'Led lamp colour changes',
			triggered: false
		})
		events.push({
			name: 'GLOW_LED',
			flash: false,
			startTime: now.clone().add('20', 'seconds'),
			duration: 5,
			targetDevice: 'led',
			startMsg: 'Led lamp colour changes',
			endMsg: 'Led lamp colour changes',
			triggered: false
		});
		
		return events;
	}
	
	/*
	** Schedules events
	*/
	function scheduleEvents(events){
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
	
	/*
	** Checks if a scheduled event has occured by comparing the moment of the event with a new moment created just now
	** Parameters checked : second, minute, hour, day, month, year
	*/
	function checkIfEventHasOccurred(now, recordedMoment){
		return now.isSame(recordedMoment, 'second') && now.isSame(recordedMoment, 'minute') && now.isSame(recordedMoment, 'hour') && now.isSame(recordedMoment, 'day') && now.isSame(recordedMoment, 'month') && now.isSame(recordedMoment, 'year');
	}
	
	var now = createNewMoment();
	console.log("Waiting ...");
	
	var events = createEvents(now);
	
	scheduleEvents(events);

	//var CoapClient = require('./CoapClient');
	//CoapClient.command();
})();