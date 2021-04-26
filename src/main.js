import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';
import store from '@/store/index';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  axios,
  store: store,
  render: h => h(App),
}).$mount('#app');
