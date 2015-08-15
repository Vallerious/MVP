/* Private methods */
var monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var date;

function getMeridium() {
	var hour = date.getHours();
	var meridium = hour <= 11 ?  'AM' : 'PM';

	return meridium;
}

function formatDate(format) {
	format = format.replace("MMM", monthAbbr[date.getMonth()]);
	format = format.replace("dd", date.getDate());
	format = format.replace("YYYY", date.getFullYear());

	return format;
}

function formatTime(format) {
	var hourFormat;

	if (format.indexOf("tt") > -1) {
		hourFormat = date.getHours() % 24;
	} else {
		hourFormat = date.getHours();
	}

	format = format.replace("H", hourFormat < 10 ? "0" + hourFormat : hourFormat);
	format = format.replace("mm", date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());	
	format = format.replace("tt", getMeridium());	

	return format;
}

/* Public methods */
function formatCommentDate(timestamp) {
	date = new Date(Number(timestamp));
	var now = new Date();
	var result = "";

	if (now.getDate() == date.getDate() && now.getMonth() == date.getMonth() && now.getFullYear() == date.getFullYear()) {
		result += formatTime("H:mm tt");
	} else if (now.getDate() - 1 == date.getDate() && now.getMonth() == date.getMonth() && now.getFullYear() == date.getFullYear()) {
		result += ("Yesterday " + formatTime("H:mm tt"));
	} else {
		result += (formatDate("MMM dd, YYYY") + " " + formatTime("H:mm tt"));
	}

	return result;
}

module.exports = {
    formatCommentDate: formatCommentDate
};