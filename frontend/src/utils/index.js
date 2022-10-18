export function formatDate(date) {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	const formatted = new Intl.DateTimeFormat("vi-VI", options).format(date)
	return formatted
}

export function calcTimePass(date) {
	const time = Math.round((Date.now() - date) / 1000)
	if (time <= 60) {
		return `${time}s`
	}
	if (time <= 3600) {
		return `${Math.round(time / 60)} phút`
	}
	if (time <= 3600 * 24) {
		return `${Math.round(time / 60 / 60)}h`
	}
	if (time <= 86400 * 30) {
		return `${Math.round(time / 60 / 60 / 24)} ngày`
	}
	if (time <= 86400 * 30 * 12) {
		return `${Math.round(time / 60 / 60 / 24 / 30)} tháng`
	}
	if (time <= 86400 * 30 * 12 * 100) {
		return `${Math.round(time / 60 / 60 / 24 / 30 / 12)} năm`
	}
}
