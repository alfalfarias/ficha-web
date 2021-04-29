import { PersonModel } from '../../models';

export const PersonDto = function(data) {
	return {
		dni: data.dni && String(data.dni),
		fullname: data.fullname && String(data.fullname),
	};
};

export const fromModel = function(model) {
	const personModel = PersonModel(model);
	const dni = `${personModel.rut}-${personModel.dv}`;

	const data = {
		dni: dni,
		fullname: personModel.nombre,
	};
	return PersonDto(data);
};

export const toModel = function(dto) {
	const personDto = PersonDto(dto);

	let rut = personDto.dni.split('-')[0].replaceAll('.', '');
	let dv = personDto.dni.substr(personDto.dni.indexOf('-') + 1);

	const data = {
		rut: rut,
		dv: dv,
		nombre: personDto.fullname,
	};

	return PersonModel(data);
};

export default {
	dto: PersonDto,
	fromModel: fromModel,
	toModel: toModel,
};