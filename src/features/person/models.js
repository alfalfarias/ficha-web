export const PhoneModel = function(data) {
	return {
		area: data.area && String(data.area),
		telefono: data.telefono && String(data.telefono),
	};
};

export const EmailModel = function(data) {
	return {
		email: data.email && String(data.email),
	};
};

export const PersonModel = function(data) {
	return {
		rut: data.rut && String(data.rut),
		dv: data.dv && String(data.dv),
		nombre: data.nombre && String(data.nombre),
		emails: data.emails && data.emails.map(item => EmailModel(item)),
		phones: data.phones && data.phones.map(item => PhoneModel(item)),
	};
};