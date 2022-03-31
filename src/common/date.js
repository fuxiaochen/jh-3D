function formatNumber(num) {
	return num <= 9 ? '0' + num : num;
}

export const formatFullDate = (timeStr) => {
	let year = new Date(timeStr).getFullYear();
	let month = formatNumber(new Date(timeStr).getMonth() + 1);
	let day = formatNumber(new Date(timeStr).getDate());
	let hour = formatNumber(new Date(timeStr).getHours());
	let minute = formatNumber(new Date(timeStr).getMinutes());
	let second = formatNumber(new Date(timeStr).getSeconds());
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
