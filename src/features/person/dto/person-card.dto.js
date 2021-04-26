import { PersonModel } from '../models';

export const PersonCardDto = function(item) {
  return {
    id: item.id && String(item.id),
    dni: item.dni && String(item.dni),
    fullname: item.fullname && String(item.fullname),
    emails: item.emails,
    phones: item.phones,

    isLoading: item.isLoading && Boolean(item.isLoading),
  };
};

export const fromModel = function(model) {
  const personModel = PersonModel(model);
  const dni = `${personModel.rut}-${personModel.dv}`;
  const fullname = `${personModel.nombre}`;

  const phones = personModel.phones.map(item => {
    return {
      area: String(item.area),
      phone: String(item.telefono),
    }
  });

  const data = {
    id: Math.random().toString(16),
    dni: dni && String(dni),
    fullname: fullname && String(fullname),
    emails: personModel.emails,
    phones: phones,

    isLoading: false,
  };
  return PersonCardDto(data);
};

export const toModel = function(dto) {
  const personCardDto = PersonCardDto(dto);

  let rut = personCardDto.dni.split('-')[0].replaceAll('.', '');
  let dv = personCardDto.dni.substr(personCardDto.dni.indexOf('-') + 1);
  const nombre = `${personCardDto.fullname}`;

  const phones = personCardDto.phones.map(item => {
    return {
      area: String(item.area),
      telefono: String(item.phone),
    }
  });

  const data = {
    rut: rut && String(rut),
    dv: dv && String(dv),
    nombre: nombre && String(nombre),
    emails: personCardDto.emails,
    phones: phones,
  };

  return PersonModel(data);
};

export default {
  PersonCardDto,
  fromModel,
  toModel,
};