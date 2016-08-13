import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("time-countdown", "Integration | Component | time countdown", {
	integration: true
});

test("it calculates time correctly", function(assert) {
	this.model = {
		currentTime: new Date(1000 * 60 * 1),
		targetTime: new Date(1000 * 60 * 5),
		interval: 1000 * 60 * 5
	};
	this.set("model", this.model);
	this.render(hbs`{{time-countdown
		targetTime=model.targetTime
		currentTime=model.currentTime
		maxTime=model.interval
	}}`);

	assert.equal(this.$(".minutes-remaining").text().trim(), "4", "Shows the right number of minutes");
});

test("it colors the bars correctly", function(assert) {
	this.model = {
		currentTime: new Date(1000 * 60 * 1),
		targetTime: new Date(1000 * 60 * 5),
		interval: 1000 * 60 * 5
	};
	this.set("model", this.model);
	this.render(hbs`{{time-countdown
		targetTime=model.targetTime
		currentTime=model.currentTime
		maxTime=model.interval
	}}`);

	assert.equal(this.$(".seconds-remaining").attr("class"), "seconds-remaining alert", "Shows the alert class below 6 minutes");
});

test("it colors the bars correctly for an alert", function(assert) {
	this.model = {
		currentTime: new Date(1000 * 60 * 7),
		targetTime: new Date(1000 * 60 * 15),
		interval: 1000 * 60 * 7
	};
	this.set("model", this.model);
	this.render(hbs`{{time-countdown
		targetTime=model.targetTime
		currentTime=model.currentTime
		maxTime=model.interval
	}}`);

	assert.equal(this.$(".seconds-remaining").attr("class"), "seconds-remaining ", "Doesn't show the alert class below 6 minutes");
});
