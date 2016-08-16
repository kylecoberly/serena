import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import Time from "../utils/time";
import Programming from "../utils/programming";

export default Model.extend({
	stopTimes: attr(),
	clock: Ember.inject.service("time"),
	nextStopClockTime: Ember.computed("stopTimes.@each", function(){
	   	return this.get("stopTimes.firstObject");
	}),
	previousStopClockTime: Ember.computed("stopTimes.@each", function(){
	   	return this.get("stopTimes.lastObject");
	}),
	currentInterval: Ember.computed("clock.currentDateTime", function(){
		var nextTime = this.get("nextStopClockTime");
		var previousTime = this.get("previousStopClockTime");
		if (Time.isClockTimeGreater(nextTime, previousTime)){
			return Time.clockTimeDifference(nextTime, previousTime);
		} else {
			return Time.clockTimeDifferenceTomorrow(nextTime, previousTime);
		}
	}),
	nextStopDateTime: Ember.computed("nextStopClockTime", function(){
		if (Time.isClockTimeGreater(this.get("clock.currentClockTime24"), this.get("nextStopClockTime"))){
			return Time.clockTimeToTomorrowsDateTime(this.get("nextStopClockTime"));
		} else {
			return Time.clockTimeToTodaysDateTime(this.get("nextStopClockTime"));
		}
	}),
	updateNextStop: Ember.on("ready", function(){
		this.get("clock").on("clockTick", () => {
			if (Time.isDateTimeGreater(this.get("clock.currentDateTime"), this.get("nextStopDateTime"))){
				this.set("stopTimes", Programming.rotateArray(this.get("stopTimes")));
			}
		});
	}),
	sortStopTimes: Ember.on("ready", function(){
		var nextTime = this.get("stopTimes").filter(function(stopTime){
			return Time.isClockTimeGreater(stopTime, this.get("clock.currentClockTime24"));
		}, this).get("firstObject");

		var rotationCount = 0;
		this.get("stopTimes").forEach(function(stopTime){
			if (Time.isClockTimeGreater(nextTime, stopTime)){
				rotationCount++;
			}
		}, this);
		this.set("stopTimes", Programming.rotateArray(this.get("stopTimes"), rotationCount));
	}),
});
