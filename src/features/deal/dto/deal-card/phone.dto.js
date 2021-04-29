import { PhoneModel } from '../../models';

export const PhoneDto = function(data) {
	return {
		area: data.area && String(data.area),
		phone: data.phone && String(data.phone),
	};
};

export const fromModel = function(model) {
	const phoneModel = PhoneModel(model);

	const data = {
		area: phoneModel.area,
		phone: phoneModel.telefono,
	};
	return PhoneDto(data);
};

export const toModel = function(dto) {
	const phoneDto = PhoneDto(dto);

	const data = {
		area: phoneDto.area,
		telefono: phoneDto.phone,
	};

	return PhoneModel(data);
};

export default {
	dto: PhoneDto,
	fromModel: fromModel,
	toModel: toModel,
};