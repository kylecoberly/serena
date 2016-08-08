import {moduleFor, test} from "ember-qunit";
import Time from "serena/utils/time";

moduleFor("service:time", "Unit | Service | time", {
});

test("Returning time", function(assert) {
	let service = this.subject();

	assert.deepEqual(service.get("currentDateTime"), new Date(), "Returns current time");
	assert.equal(service.get("currentClockTime24"), Time.formatTime(new Date(), "HH:MM24"), "Returns current time in 24 clock time");
	assert.equal(service.get("currentClockTime12"), Time.formatTime(new Date(), "HH:MM12"), "Returns current time in 12 clock time");
});
