import Ember from "ember";
import Time from "../utils/time";

export default Ember.Service.extend(Ember.Evented, {
	updateTime: Ember.on("init", function(){
		if (!Ember.testing){
			return Ember.run.later(this, function(){
				this.notifyPropertyChange("currentDateTime");
				this.trigger("clockTick");
				this.updateTime();
			}, 1000);
		}
	}),
	currentDateTime: Ember.computed(function(){
		var currentDateTime = new Date();
		// For debugging
		var offset = Time.offsetTimestamp(0, 0, 0);
		return new Date(currentDateTime.setTime(currentDateTime.getTime() + offset));
	}),
	currentClockTime24: Ember.computed("currentDateTime", function(){
		return Time.formatTime(this.get("currentDateTime"), "HH:MM24");
	}),
	currentClockTime12: Ember.computed("currentDateTime", function(){
		return Time.formatTime(this.get("currentDateTime"), "HH:MM12");
	})
});
