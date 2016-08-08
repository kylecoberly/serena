export default {
	rotateArray(array, count){
		count = count || 1;
		for (let i = 0; i < count; i++){
			var first = array.shiftObject();
			array.pushObject(first);
		}
		return array;
	},
	leftPad(string, count){
		var zeroes = "";
		for (let i = 1; i <= count; i++){
			zeroes += "0";
		}

		return (zeroes + string).substring(string.length);
	}
};
