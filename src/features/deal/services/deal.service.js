import axios from 'axios';
import { api } from '@/config/api';
import { Pagination } from '@/http/pagination';
import { DealModel } from '../models';

const endpoint = `${api.url}/api/deal/deals`;

export const service = {
	async fetchPaginate({page=1, perPage=10, sort='-id', queryParams = {}}) {
    const params = { };
    for (const key in queryParams) {
      params[key] = queryParams[key];
      // params[key] = encodeURI(queryParams[key]);
    }

    const http = await axios.get(`${endpoint}`, { params: params });
    const response = http.data;
    const data = {
      ...Pagination(response),
      data: response.data.map(item => DealModel(item)),
    }
    return data;
	},
	async fetchAll({queryParams} = {}) {
		const http = await axios.get(`${endpoint}`, { params: queryParams });
    const data = http.data.map(item => DealModel(item));
    return data;
	},
	async fetchOne({id}) {
		const http = await axios.get(`${endpoint}/${id}`);
    const item = DealModel(http.data);
		return item;
	},
};

export default service;