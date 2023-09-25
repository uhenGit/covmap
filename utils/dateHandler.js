export function formatDateToISOString(date) {
	const [ fullDate, year, month, day ] = date
		.toISOString()
		.match(/^(\d{4})-(\d{2})-(\d{2}).*$/);

	return [ year, month, day ].join('-');
}