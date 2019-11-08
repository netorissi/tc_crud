export const numberToReal = number => {
	let v = number.replace(/\D/g, '');
	v = (v / 100).toFixed(2) + '';
	v = v.replace(".", ",");
	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
	return v;
}

export const removeAccents = string => {
	const accents = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
	const alphabetic = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
	let newString = "";

	for (let i = 0; i < string.length; i++) {
		let checkChange = false;
		for (let a = 0; a < accents.length; a++) {
			if (string.substr(i, 1) === accents.substr(a, 1)) {
				newString += alphabetic.substr(a, 1);
				checkChange = true;
				break;
			}
		}
		if (!checkChange) newString += string.substr(i, 1);
	}
	return newString;
}