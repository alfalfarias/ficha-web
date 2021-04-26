import axios from 'axios';
import authInterceptor from '/src/features/auth/interceptors/auth.interceptor';

axios.interceptors.request.use(authInterceptor);

export default axios;
