const capitalize = function (value) {
	if (!value && value != 0) return '';

	const words = value.split(' ');
	let result = '';
	for (let word of words){
		result += word.charAt(0).toUpperCase();
		if (word.length > 1) {
			result += word.substring(1, word.length).toLowerCase();
		}
		result += ' ';
	}

	return result;
};

export default capitalize;