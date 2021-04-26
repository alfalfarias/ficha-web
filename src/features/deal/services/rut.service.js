import axios from 'axios';
import { api } from '@/config/api';
import { CreateRutDto, ItemRutDto } from "../dto";
import { RutModel as Model, verificacion } from '../models';

const endpoint = `${api.url}/api/rut/ruts`;

export default {
	async paginate({page=1, perPage=10, sort='-id', queryParams}) {
    const http = await axios.get(`${endpoint}`, { params: queryParams });
    const paginated = http.data;
    paginated.data.map(item => toItemDto(item));
	},
	async fetchAll({queryParams} = {}) {
		const http = await axios.get(`${endpoint}`, { params: queryParams });
    const data = http.data.map(item => toItemDto(item));
    return data;
	},
	async create({data} = null) {
    const createRutDto = CreateRutDto(data);
    const model = toModel(createRutDto);
    const formData = {
      rut: model.rut,
      dv: model.dv,
      verificacion: model.verificacion,
    }
    const http = await axios.post(`${endpoint}`, formData);
    const item = toItemDto(http.data);
		return item;
	},
	async fetchOne({id}) {
		const http = await axios.get(`${endpoint}/${id}`);
    const item = toItemDto(http.data);
		return item;
	},
	async update({id, data}) {
    const formData = {
      verificacion: data.botStatus,
    }
		const http = await axios.put(`${endpoint}/${id}`, formData);
    const item = toItemDto(http.data);
		return item;
	},
	async remove({id}) {
		const http = await axios.delete(`${endpoint}/${id}`);
		return http.data;
	},
};


export function toItemDto(apiItem){
  let dni = apiItem.rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const item = ItemRutDto({
    id: apiItem.id,
    dni: `${dni}-${apiItem.dv}`,
    aecoCode: apiItem.code_aeco,
    womDebt: apiItem.mdeudaw,
    sinacofiDebt: apiItem.mdeudas,
    botStatus: apiItem.verificacion,
    updatedAt: apiItem.fecha,
  });
  return item;
}

export function toModel(dto){
  let rut = dto.dni.split("-")[0].replaceAll(".", "");
  let dv = dto.dni.substr(dto.dni.indexOf("-") + 1);

  const item = Model({
    id: Number(dto.id),
    rut: rut || Number(rut),
    dv: dv || String(dv),
    code_aeco: dto.aecoCode || String(dto.aecoCode),
    mdeudaw: dto.womDebt || String(dto.womDebt),
    mdeudas: dto.sinacofiDebt || String(dto.sinacofiDebt),
    verificacion: dto.botStatus || verificacion(dto.botStatus),
    fecha: dto.updatedAt || String(dto.updatedAt),
  });
  return item;
}