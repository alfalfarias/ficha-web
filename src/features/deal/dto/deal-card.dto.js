import { DealModel } from '../models';
import { PersonDto, fromModel as personFromModel, toModel as personToModel } from './deal-card/person.dto';
import { EmailDto, fromModel as emailFromModel, toModel as emailToModel } from './deal-card/email.dto';
import { PhoneDto, fromModel as phoneFromModel, toModel as phoneToModel } from './deal-card/phone.dto';

export const DealCardDto = function(data) {
  return {
    id: data.id && Number(data.id),
    dni: data.dni && String(data.dni),
    amount: data.amount && Number(data.amount),
    status: data.status && String(data.status),

    person: data.person && PersonDto(data.person),
    emails: data.emails && data.emails.map(item => EmailDto(item)),
    phones: data.phones && data.phones.map(item => PhoneDto(item)),

    isLoading: data.isLoading && Boolean(data.isLoading),
  };
};

export const fromModel = function(model) {
  const dealModel = DealModel(model);

  const data = {
    id: dealModel.id_negocio && Number(dealModel.id_negocio),
    dni: dealModel.rut && Number(dealModel.rut),
    amount: dealModel.monto && Number(dealModel.monto),
    status: dealModel.estado && String(dealModel.estado),

    person: dealModel.person && personFromModel(dealModel.person),
    emails: dealModel.emails && dealModel.emails.map(item => emailFromModel(item)),
    phones: dealModel.phones && dealModel.phones.map(item => phoneFromModel(item)),

    isLoading: false,
  };

  return DealCardDto(data);
};

export const toModel = function(dto) {
  const dealCardDto = DealCardDto(dto);

  const data = {
    id_negocio: dealCardDto.id && Number(dealCardDto.id),
    rut: dealCardDto.dni && Number(dealCardDto.dni),
    monto: dealCardDto.amount && Number(dealCardDto.amount),
    estado: dealCardDto.status && Number(dealCardDto.status),

    person: dealCardDto.person && personToModel(dealCardDto.person),
    emails: dealCardDto.emails && dealCardDto.emails.map(item => emailToModel(item)),
    phones: dealCardDto.phones && dealCardDto.phones.map(item => phoneToModel(item)),
  };

  return DealModel(data);
};

export default {
  DealCardDto,
  fromModel,
  toModel,
};