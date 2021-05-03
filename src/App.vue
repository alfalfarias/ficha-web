<template>
  <v-app>
    <Navbar
      :username="username"
      :isLoading="isLoading.fetchUserRequest"
      @homeBtn="openPersonView"
      @closeSessionBtn="closeSession"
    />

    <v-main class="grey lighten-4" ref="mainList">
      <div class="content">
        <router-view></router-view>
      </div>
    </v-main>

    <AppFooter href="http://cominltda.cl/" />
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Navbar from '@/components/template/Navbar';
import Footer from '@/components/template/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    AppFooter: Footer,
  },
  computed: {
    ...mapState('auth', {
      username: (state) => state.user,
    }),
  },
  data() {
    return {
      isLoading: {
        fetchUserRequest: false,
      },
      data: {
        username: null,
      },
    };
  },
  methods: {
    ...mapActions('auth', ['logout', 'authenticate']),
    openPersonView() {
      if (this.username) {
        this.$router.push({ name: 'DealList' }).catch(() => {});
      }
    },
    async closeSession() {
      await this.logout();
      this.$router.push({ name: 'Login' }).catch(() => {});
    },
    async fetchUser() {
      try {
        this.isLoading.fetchUserRequest = true;
        const user = await this.authenticate().catch(() => {});
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        this.isLoading.fetchUserRequest = false;
      }
    },
  },
  async created() { 
    this.fetchUser();
  },
};
</script>

<style>
.logo {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
}
.content {
  padding: 32px;
}
.btn-scraper {
  padding: 0 5px !important;
}
</style>