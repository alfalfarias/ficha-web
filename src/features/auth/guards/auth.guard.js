import authService from '../services/auth.service';

const authGuard = async (to, from, next) {
  try {
    const user = await authService.authenticate();
    next();
  } catch (error) {
    next({ name: 'Login' });
  }
};

export default authGuard;