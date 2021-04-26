import axios from 'axios';
import { api } from '@/config/api';
import { Pagination } from '@/http/pagination';
import { PersonModel } from '../models';

const endpoint = `${api.url}/api/person/persons`;

export const service = {
	async fetchPaginate({page=1, perPage=10, sort='-id', queryParams}) {
    const http = await axios.get(`${endpoint}`, { params: queryParams });
    const response = http.data;
    const data = {
      ...Pagination(response),
      data: response.data.map(item => PersonModel(item)),
    }
    return data;
	},
	async fetchAll({queryParams} = {}) {
		const http = await axios.get(`${endpoint}`, { params: queryParams });
    const data = http.data.map(item => PersonModel(item));
    return data;
	},
	async fetchOne({id}) {
		const http = await axios.get(`${endpoint}/${id}`);
    const item = PersonModel(http.data);
		return item;
	},
};

export default {
  personService: service,
};