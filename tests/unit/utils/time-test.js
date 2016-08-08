import time from "serena/utils/time";
import {module, test} from "qunit";

module("Unit | Utility | time");

// Might have issues being run outside of MST

test("offsetTimestamp works", function(assert) {
	assert.equal(0, time.offsetTimestamp(0, 0, 0), "Default works");
	assert.equal(5 * 1000, time.offsetTimestamp(5, 0, 0), "Default works");
	assert.equal(5 * 1000 * 60, time.offsetTimestamp(0, 5, 0), "Default works");
	assert.equal(5 * 1000 * 60 * 60, time.offsetTimestamp(0, 0, 5), "Default works");
	assert.equal(5 * 1000 + 5 * 60 * 1000 + 5 * 60 * 60 * 1000, time.offsetTimestamp(5, 5, 5), "Default works");
});
test("isClockTimeGreater works", function(assert) {
	assert.ok(time.isClockTimeGreater("17:00", "16:00"), "Greater than passes");
	assert.notOk(time.isClockTimeGreater("17:00", "17:00"), "Equal fails");
	assert.notOk(time.isClockTimeGreater("16:00", "17:00"), "Less than fails");
});
test("isClockTimeGreaterOrEqual works", function(assert) {
	assert.ok(time.isClockTimeGreaterOrEqual("17:00", "16:00"), "Greater than passes");
	assert.ok(time.isClockTimeGreaterOrEqual("17:00", "17:00"), "Equal passes");
	assert.notOk(time.isClockTimeGreaterOrEqual("16:00", "17:00"), "Less than fails");
});
test("isDateTimeGreater works", function(assert) {
	assert.ok(time.isDateTimeGreater(new Date(20), new Date(10)), "Greater than passes");
	assert.notOk(time.isDateTimeGreater(new Date(20), new Date(20)), "Equal fails");
	assert.notOk(time.isDateTimeGreater(new Date(10), new Date(20)), "Less than fails");
});
test("clockTimeDifference works", function(assert) {
	assert.equal(time.clockTimeDifference("17:00", "16:00"), 60 * 60, "Time difference in the past");
	assert.equal(time.clockTimeDifference("16:00", "16:00"), 0, "Same time");
	assert.equal(time.clockTimeDifference("16:00", "17:00"), -1 * 60 * 60, "Time difference in the future");
});
test("clockTimeDifferenceTomorrow works", function(assert) {
	assert.equal(time.clockTimeDifferenceTomorrow("17:00", "16:00"), 24 * 60 * 60 + 60 * 60, "Time difference in the past");
	assert.equal(time.clockTimeDifferenceTomorrow("16:00", "16:00"), 24 * 60 * 60, "Same time tomorrow");
	assert.equal(time.clockTimeDifferenceTomorrow("16:00", "17:00"), 23 * 60 * 60, "Time difference tomorrow");
});
test("clockTimeToTodaysDateTime works", function(assert) {
	var todaysDateTime = new Date();
	todaysDateTime = new Date(todaysDateTime.setHours(15));
	todaysDateTime = new Date(todaysDateTime.setMinutes(0));
	todaysDateTime = new Date(todaysDateTime.setSeconds(0));
	todaysDateTime = new Date(todaysDateTime.setMilliseconds(0));
	assert.deepEqual(time.clockTimeToTodaysDateTime("15:00"), todaysDateTime, "Assigns today's date");
});
test("clockTimeToTomorrowsDateTime works", function(assert) {
	var todaysDateTime = new Date();
	var tomorrowsDateTime = new Date(todaysDateTime.setDate(todaysDateTime.getDate() + 1));
	tomorrowsDateTime = new Date(tomorrowsDateTime.setHours(15));
	tomorrowsDateTime = new Date(tomorrowsDateTime.setMinutes(0));
	tomorrowsDateTime = new Date(tomorrowsDateTime.setSeconds(0));
	tomorrowsDateTime = new Date(tomorrowsDateTime.setMilliseconds(0));
	assert.deepEqual(time.clockTimeToTomorrowsDateTime("15:00"), tomorrowsDateTime, "Assigns today's date");
});
test("clockTimeToMilliseconds works", function(assert) {
	assert.equal(time.clockTimeToMilliseconds("10:00"), 1000 * 60 * 60 * 10, "Converts correctly");
	assert.equal(time.clockTimeToMilliseconds("1:23"), 1000 * 60 * 60 * 1 + 1000 * 60 * 23, "Converts correctly");
});
test("millisecondsToMinutes works", function(assert) {
	assert.equal(time.millisecondsToMinutes(0), 0, "Calculates 0 minutes");
	assert.equal(time.millisecondsToMinutes(1000 * 60 * 1), 1, "Calculates 1 minute");
	assert.equal(time.millisecondsToMinutes(1000 * 60 * 5), 5, "Calculates 5 minutes");
});
test("millisecondsToSeconds works", function(assert) {
	assert.equal(time.millisecondsToSeconds(0), 0, "Calculates 0 seconds");
	assert.equal(time.millisecondsToSeconds(1000 * 1), 1, "Calculates 1 second");
	assert.equal(time.millisecondsToSeconds(1000 * 5), 5, "Calculates 5 seconds");
});
test("formatDate works", function(assert) {
	assert.equal(time.formatDate(new Date(0), "MMDDYYYY"), "12/31/1969", "Generates MMDDYYYY correctly");
});
test("formatTime works", function(assert) {
	assert.equal(time.formatTime(new Date(0), "HH:MM24"), "17:00", "24 Hour correctly generates time");
	assert.equal(time.formatTime(new Date(0), "HH:MM12"), "5:00", "12 Hour correctly generates time");
});
test("formatDateTimeAsMMDDYYYY works", function(assert) {
	assert.equal(time.formatDateTimeAsMMDDYYYY(new Date(0)), "12/31/1969", "Correctly generates date");
	assert.equal(time.formatDateTimeAsMMDDYYYY(new Date(1000 * 60 * 60 * 24)), "01/01/1970", "Correctly generates left-padded date");
});
test("formatDateTimeAsHHMM24 works", function(assert) {
	assert.equal(time.formatDateTimeAsHHMM24(new Date(0)), "17:00", "Correctly generates 0 time");
	assert.equal(time.formatDateTimeAsHHMM24(new Date(1000 * 60 * 3 + 1000 * 60 * 60 * 20)), "13:03", "Correctly generates 24-hour time");
});
test("formatDateTimeAsHHMM12 works", function(assert) {
	assert.equal(time.formatDateTimeAsHHMM12(new Date(0)), "5:00", "Correctly generates 0 time");
	assert.equal(time.formatDateTimeAsHHMM12(new Date(1000 * 60 * 3 + 1000 * 60 * 60 * 20)), "1:03", "Correctly generates 24-hour time");
});
