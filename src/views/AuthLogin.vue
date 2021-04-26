<template>
  <AuthLogin />
</template>

<script>
import AuthLogin from '@/features/auth/views/Login';

export default {
  name: 'Login',
  components: {
    AuthLogin: AuthLogin,
  },
};
</script>