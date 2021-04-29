import { EmailModel } from '../../models';

export const EmailDto = function(data) {
	return {
		email: data.email && String(data.email),
	};
};

export const fromModel = function(model) {
	const emailModel = EmailModel(model);

	const data = {
		email: emailModel.email,
	};
	return EmailDto(data);
};

export const toModel = function(dto) {
	const emailDto = EmailDto(dto);

	const data = {
		email: emailDto.email,
	};
	return EmailModel(data);
};

export default {
	dto: EmailDto,
	fromModel: fromModel,
	toModel: toModel,
};