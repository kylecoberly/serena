import Programming from "../utils/programming";

export default {
	// Time manipulation
	offsetTimestamp(seconds, minutes, hours){
		seconds = seconds * 1000 || 0;
		minutes = minutes * 1000 * 60 || 0;
		hours = hours * 1000 * 60 * 60 || 0;
		return seconds + minutes + hours;
	},

	// Time comparisons
	isClockTimeGreater(firstTime, secondTime){
		return this.clockTimeToMilliseconds(firstTime) > this.clockTimeToMilliseconds(secondTime);
	},
	isClockTimeGreaterOrEqual(firstTime, secondTime){
		return this.clockTimeToMilliseconds(firstTime) >= this.clockTimeToMilliseconds(secondTime);
	},
	isDateTimeGreater(firstDate, secondDate){
		return firstDate.getTime() > secondDate.getTime();
	},
	clockTimeDifference(firstTime, secondTime){
		// In seconds
		return (this.clockTimeToMilliseconds(firstTime) - this.clockTimeToMilliseconds(secondTime)) / 1000;
	},
	clockTimeDifferenceTomorrow(firstTime, secondTime){
		firstTime = (this.clockTimeToMilliseconds(firstTime) + 24 * 60 * 60 * 1000) / 1000;
		secondTime = this.clockTimeToMilliseconds(secondTime) / 1000;
		// In seconds
		return firstTime - secondTime;
	},

	// Time Parsing
	clockTimeToTodaysDateTime(time){
		return new Date([this.formatDate(new Date(), "MMDDYYYY"), time].join(" "));
	},
	clockTimeToTomorrowsDateTime(time){
		var today = this.clockTimeToTodaysDateTime(time);
		return new Date(today.setDate(today.getDate() + 1));
	},
	clockTimeToMilliseconds(time){
		// Date is arbitrary, just need times
		var parsedTime = time.split(":");
		return new Date(Date.UTC(1970, 0, 1, parseInt(parsedTime[0]), parseInt(parsedTime[1]))).getTime();
	},
	millisecondsToMinutes: function(milliseconds){
		return milliseconds / 1000 / 60;
	},
	millisecondsToSeconds: function(milliseconds){
		return milliseconds / 1000;
	},

	// Time formatting
	formatDate(date, format){
		switch (format){
			case "MMDDYYYY":
				return this.formatDateTimeAsMMDDYYYY(date);
			default:
				throw new Error("That format is not supported");
		}
	},
	formatTime(date, format){
		switch (format){
			case "HH:MM24":
				return this.formatDateTimeAsHHMM24(date);
			case "HH:MM12":
				return this.formatDateTimeAsHHMM12(date);
			default:
				throw new Error("That format is not supported");
		}
	},
	formatDateTimeAsMMDDYYYY(date){
		var month = Programming.leftPad((date.getMonth() + 1).toString(), 2);
		var day = Programming.leftPad(date.getDate().toString(), 2);
		var year = date.getFullYear();

		return [month, day, year].join("/");
	},
	formatDateTimeAsHHMM24(date){
		var currentHours = date.getHours();
		var currentMinutes = Programming.leftPad(date.getMinutes().toString(), 2);
		return [currentHours, currentMinutes].join(":");
	},
	formatDateTimeAsHHMM12(date){
		var currentHours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		currentHours = currentHours ? currentHours : 12;
		var currentMinutes = Programming.leftPad(date.getMinutes().toString(), 2);
		return [currentHours, currentMinutes].join(":");
	}
};
