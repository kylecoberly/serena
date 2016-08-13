import Ember from "ember";
import Time from "../../utils/time";

export default Ember.Component.extend({
	tagName: "div",
	classNames: ["countdown-timer"],
	error: false,
	isBikeCutoff: Ember.computed("minutesRemaining", function(){
		if (this.get("minutesRemaining") <= 6){
			return true;
		} else {
			return false;
		}
	}),
	minutesRemaining: Ember.computed("timeRemaining", function(){
		if (!this.get("error")){
			return Math.ceil(Time.millisecondsToMinutes(this.get("timeRemaining")));
		}
	}),
	secondsRemaining: Ember.computed("timeRemaining", function(){
		if (!this.get("error")){
			return Math.ceil(Time.millisecondsToSeconds(this.get("timeRemaining")));
		}
	}),
	timeRemaining: Ember.computed("currentTime", function(){
		if (this.get("targetTime") instanceof Date ||
			this.get("currentTime") instanceof Date ||
			Number.isInteger(this.get("maxTime"))
		){
			this.set("error", false);
			return this.get("targetTime").getTime() - this.get("currentTime").getTime();
		} else {
			this.set("error", true);
		}
	})
});
