import {test} from "qunit";
import moduleForAcceptance from "serena/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | transportation page", {
	beforeEach: function() {
		server.create("train", {
			id: 1,
			stopTimes: [
				"10:03",
				"10:05",
				"10:08"
			]
		});
	}
});

test("It should tell me the time of the next train", function(assert) {
	visit("/transportation/1");

	andThen(function() {
		assert.equal(currentURL(), "/transportation/1");
		assert.equal(find("h2").text(), "Minutes Until A-Line Leaves");
		assert.ok(find(".minutes-remaining").text(), "Train time displays");
	});
});
