export const LoginDto = function(data) {
  return {
    username: data.username,
    password: data.password,
  };
};

export const AuthDto = function(data) {
  return {
    token: data.token,
  };
};

export default {AuthDto, LoginDto};