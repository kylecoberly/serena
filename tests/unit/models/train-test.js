import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("train", "Unit | Model | train", {
	needs: ["service:time"]
});

test("it exists", function(assert) {
	//let model = this.subject();
	let store = this.store();
	var timeService = Ember.Service.extend(Ember.Evented, {
		updateTime(offset){
			this.set("currentDateTime", new Date(this.get("currentDateTime").getTime() + offset));
			this.notifyPropertyChange("currentDateTime");
			this.trigger("clockTick");
		},
		currentDateTime: Ember.computed(function(){
			var now = new Date();
			var today = new Date(now.setHours(17));
			today = new Date(now.setMinutes(0));
			today = new Date(now.setSeconds(0));
			today = new Date(now.setMilliseconds(0));
			return today;
		}),
		currentClockTime24: "17:00",
		currentClockTime12: "5:00"
	});
	var train;
	Ember.run(() => {
		train = store.createRecord("train", {
			stopTimes: [
				"16:50",
				"17:20",
				"17:50"
			],
			clock: timeService.create()
		});
	});

	assert.equal(train.get("nextStopClockTime"), "17:20", "Calculates next time correctly");
	assert.equal(train.get("previousStopClockTime"), "16:50", "Calculates previous time correctly");
	assert.equal(train.get("currentInterval"), 30 * 60, "Calculates interval correctly");

	var todaysNextStopDateTime = new Date();
	todaysNextStopDateTime = new Date(todaysNextStopDateTime.setHours(17));
	todaysNextStopDateTime = new Date(todaysNextStopDateTime.setMinutes(20));
	todaysNextStopDateTime = new Date(todaysNextStopDateTime.setSeconds(0));
	todaysNextStopDateTime = new Date(todaysNextStopDateTime.setMilliseconds(0));
	assert.deepEqual(train.get("nextStopDateTime"), todaysNextStopDateTime, "Calculates next datetime correctly");

	var sortedStopTimes = [
		"17:20",
		"17:50",
		"16:50"
	];
	assert.deepEqual(train.get("stopTimes"), sortedStopTimes, "Sorts stop times correctly");

	// First stop passed
	Ember.run(() => {
		train.get("clock").updateTime(1000 * 60 * 30);
		train.set("clock.currentClockTime24", "17:30");
		train.set("clock.currentClockTime12", "5:30");
	});
	assert.equal(train.get("nextStopClockTime"), "17:50", "Calculates next time correctly");
	assert.equal(train.get("previousStopClockTime"), "17:20", "Calculates previous time correctly");
	assert.equal(train.get("currentInterval"), 30 * 60, "Calculates interval correctly");

	// Overnight
	Ember.run(() => {
		train.get("clock").updateTime(1000 * 60 * 30);
		train.set("clock.currentClockTime24", "18:00");
		train.set("clock.currentClockTime12", "6:00");
	});
	assert.equal(train.get("nextStopClockTime"), "16:50", "Calculates next time correctly");
	assert.equal(train.get("previousStopClockTime"), "17:50", "Calculates previous time correctly");
	var tomorrow = (10 * 60) + (6 * 60 * 60) + (16 * 60 * 60) + (50 * 60);
	assert.equal(train.get("currentInterval"), tomorrow, "Calculates interval correctly");
});
