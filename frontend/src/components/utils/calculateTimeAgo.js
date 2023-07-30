export const calculateTimeAgo = (timestamp) => {
	if (timestamp === null || timestamp === undefined) {
		return '';
	}
	const currentTime = new Date();
	const postTime = new Date(timestamp);
	const elapsed = currentTime - postTime;
	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;

	if (elapsed < minute) {
		return 'Posted just now';
	} else if (elapsed < hour) {
		const minutesAgo = Math.floor(elapsed / minute);
		return `Posted ${minutesAgo} ${
			minutesAgo === 1 ? 'minute' : 'minutes'
		} ago`;
	} else if (elapsed < day) {
		const hoursAgo = Math.floor(elapsed / hour);
		return `Posted ${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
	} else {
		return handleTimeStamp(timestamp);
	}
};

const handleTimeStamp = (time) => {
	let date = new Date(time);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	day = day < 10 ? '0' + day : day;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	let formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
	return formattedDate;
};
