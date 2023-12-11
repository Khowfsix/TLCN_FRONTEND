const formatedDateTime = (datetimeRaw) => {
	const date = new Date(datetimeRaw);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = String(date.getFullYear());
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	const formattedDateString = `${day}/${month}/${year} - ${hours}:${minutes}`;
	return formattedDateString;
};

export default formatedDateTime;
