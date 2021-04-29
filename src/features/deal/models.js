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
	};
};

export const DealModel = function(data) {
	return {
		id_negocio: data.id_negocio && Number(data.id_negocio),
		monto: data.monto && Number(data.monto),
		factualizacion: data.factualizacion && String(data.factualizacion),
		nrooperacion: data.nrooperacion && String(data.nrooperacion),
		ctacliente: data.ctacliente && String(data.ctacliente),
		categoria: data.categoria && String(data.categoria),
		prioridad: data.prioridad && Number(data.prioridad),
		marca: data.marca && Number(data.marca),
		segmentacion: data.segmentacion && Number(data.segmentacion),
		empleador: data.empleador && String(data.empleador),
		id_tnegocio: data.id_tnegocio && Number(data.id_tnegocio),
		rut: data.rut && Number(data.rut),
		id_cliente: data.id_cliente && Number(data.id_cliente),
		id_usuario: data.id_usuario && Number(data.id_usuario),
		mcompromiso: data.mcompromiso && Number(data.mcompromiso),
		fcompromiso: data.fcompromiso && String(data.fcompromiso),
		moferta: data.moferta && Number(data.moferta),
		fvence: data.fvence && String(data.fvence),
		mactual: data.mactual && Number(data.mactual),
		rol: data.rol && String(data.rol),
		juzgado: data.juzgado && String(data.juzgado),
		fcreado: data.fcreado && String(data.fcreado),
		fasignado: data.fasignado && String(data.fasignado),
		fusuasi: data.fusuasi && String(data.fusuasi),
		id_gestion: data.id_gestion && Number(data.id_gestion),
		id_gestioncdt: data.id_gestioncdt && Number(data.id_gestioncdt),
		estado: data.estado && String(data.estado),
		convenio: data.convenio && String(data.convenio),
		correlativo: data.correlativo && Number(data.correlativo),
		estadop: data.estadop && String(data.estadop),
		detalle: data.detalle && String(data.detalle),
		id_usapp: data.id_usapp && Number(data.id_usapp),
		idn1: data.idn1 && Number(data.idn1),
		idn2: data.idn2 && Number(data.idn2),
		idn3: data.idn3 && Number(data.idn3),
		id_correlativo_pjud: data.id_correlativo_pjud && Number(data.id_correlativo_pjud),

		person: data.person && PersonModel(data.person),

		emails: data.emails && data.emails.map(item => EmailModel(item)),
		phones: data.phones && data.phones.map(item => PhoneModel(item)),
	};
};