/*
** Filename - 'calendar.js'
** Author - 'Sayantan Hore'
** Created on - '07.12.2015'
** Description - 'This file holds the calendar events to listen to and calls CoAP client with required params'
*/

(function(){
	'use strict';
	
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
		return now.isSame(recordedMoment, 'second') && now.isSame(recordedMoment, 'minute') && now.isSame(recordedMoment, 'hour') && now.isSame(recordedMoment, 'day') && now.isSame(recordedMoment, 'month') && now.isSame(recordedMoment, 'year');
	}
	
	var now = moment();
	console.log("Waiting ...");
	
	var events = [];
	
	events.push({
		name: 'BLINK_LED',
		flash: true,
		startTime: now.clone().add('5', 'seconds'),
		targetDevice: 'led',
		msg: 'Led lamp colour changes'
	});
	events.push({
		name: 'GLOW_LED',
		flash: false,
		startTime: now.clone().add('10', 'seconds'),
		duration: 5,
		targetDevice: 'led',
		startMsg: 'Led lamp colour changes',
		endMsg: 'Led lamp colour changes'
	})
	events.push({
		name: 'GLOW_LED',
		flash: false,
		startTime: now.clone().add('20', 'seconds'),
		duration: 5,
		targetDevice: 'led',
		startMsg: 'Led lamp colour changes',
		endMsg: 'Led lamp colour changes'
	});
	
	events.forEach(function(element, index){
		setInterval(function(){
			if (checkIfEventHasOccurred(moment(), element.startTime)){
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

	//var CoapClient = require('./CoapClient');
	//CoapClient.command();
})();
