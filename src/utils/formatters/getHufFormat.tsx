const getHufFormat = (val: number = 0): string => {
	var formatter = new Intl.NumberFormat('hu-HU', {
		style: 'currency',
		currency: 'HUF',
		maximumFractionDigits: 0,
	});
	return formatter.format(val);
};

export default getHufFormat;
