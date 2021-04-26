import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth: Auth,
  },
});

export default store;