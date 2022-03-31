//时间戳转日期
function formatString(m) {
	return m < 10 ? '0' + m : m
}

export function formatDate(date) {
	let data= new Date(date);
	let year = data.getFullYear();
	let month = formatString(data.getMonth() +1);
	let day = formatString(data.getDate());
	let hour = formatString(data.getHours());
	let minutes = formatString(data.getMinutes());
	let seconds = formatString(data.getSeconds());

	return year + "-" + month + "-" + day +' ' +hour + ':' + minutes + ':' + seconds;
}

export function  day(d){
	let date = new Date(d);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	return   year + "-" + month + "-" + day;
}
