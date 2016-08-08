import programming from "serena/utils/programming";
import {module, test} from "qunit";

module("Unit | Utility | programming");

test("rotate array works", function(assert){
	var array = [1, 2, 3];
	array = programming.rotateArray(array);
	assert.deepEqual(array, [2, 3, 1], "Default rotation works");
	array = programming.rotateArray(array, 4);
	assert.deepEqual(array, [3, 1, 2], "Counted rotation works");
});

test("left pad works", function(assert){
	assert.equal(programming.leftPad("23", 1), "3", "One pad");
	assert.equal(programming.leftPad("23", 2), "23", "Two pads");
	assert.equal(programming.leftPad("23", 4), "0023", "Four pads");
	assert.equal(programming.leftPad("23", 6), "000023", "Six pads");
});
