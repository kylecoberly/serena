import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("time-countdown", "Integration | Component | time countdown", {
	integration: true,
    beforeEach: function(){
        this.model = {
            currentTime: new Date(1000 * 60 * 1),
            targetTime: new Date(1000 * 60 * 5),
            interval: 1000 * 60 * 5
        };
        this.set("model", this.model);
    }
});

test("it calculates time correctly", function(assert) {
	this.render(hbs`{{time-countdown
		targetTime=model.targetTime
		currentTime=model.currentTime
		maxTime=model.interval
	}}`);

	assert.equal(this.$(".minutes-remaining").text().trim(), "4", "Shows the right number of minutes");
});
