import authService from "@/features/auth/services/auth.service";

export default {
  namespaced: true,
  modules: {},
  state: {
    user: null,
    token: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isSession(state) {
      console.log('state.user', state.user);
      return !!state.user;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, { user, token }) {
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
    },
    async logout({ commit }) {
      await authService.logout();
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
    },
    async authenticate({ commit }) {
      const token = authService.token;
      const { username } = await authService.authenticate();
      commit('SET_USER', username);
      commit('SET_TOKEN', token);
    },
  }
}