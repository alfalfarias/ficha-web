import authService from '../services/auth.service';

const authInterceptor = function(config) {
  const TOKEN = authService.token;
  
  config.headers['Content-Type'] = `application/json`;
  if(TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
};

export default authInterceptor;