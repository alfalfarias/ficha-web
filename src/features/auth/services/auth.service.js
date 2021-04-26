import axios from 'axios';
import { api } from '@/config/api';
import { AuthDto, LoginDto } from '../dto';

const endpoint = `${api.url}/api/auth`;

const JWT_KEY = 'JWT'; 

export default {
  get token() {
    return localStorage.getItem(JWT_KEY);
  },
  set token(token) {
    localStorage.setItem(JWT_KEY, token);
    return token;
  },
	async login({data}) {
    const formData = LoginDto(data);
    const http = await axios.post(`${endpoint}/login`, formData);
    const response = AuthDto(http.data);
    localStorage.setItem(JWT_KEY, response.token);
		return response;
	},
	async authenticate() {
    const token = localStorage.getItem(JWT_KEY);
		const http = await axios.get(`${endpoint}/user`);
		const data = http.data;
    const user = data.user;
    return {
      username: user.nombre
    };
	},
	async logout() {
    const http = await axios.get(`${endpoint}/logout`);
    localStorage.removeItem(JWT_KEY);
	},
};
