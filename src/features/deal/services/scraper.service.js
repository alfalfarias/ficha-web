import axios from 'axios';
import { api } from '@/config/api';
import { toItemDto } from './rut.service';

const endpoint = `${api.url}/api/scraper`;

export default {
	async refreshOne({id}) {
		const http = await axios.get(`${endpoint}/ruts/${id}/refresh`);
    const item = toItemDto(http.data);
		return item;
	},
	async refreshAll(ids) {
    let requests = ids.map(id => this.refreshOne(id));
    return Promise.all(requests);
	},
};
