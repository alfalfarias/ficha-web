<template>
  <v-app>
    <Navbar
      :username="username"
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
import MainPanel from '@/features/setting/views/MainPanel';

export default {
  name: 'App',
  components: {
    Navbar,
    AppFooter: Footer,
    SettingsPanel: MainPanel,
  },
  computed: {
    ...mapState('auth', {
      username: (state) => state.user,
    }),
  },
  data() {
    return {
      dialog: {
        settings: false,
      },
      data: {
        username: null,
      },
    };
  },
  methods: {
    ...mapActions('auth', ['logout', 'authenticate']),
    openPersonView() {
      console.log('openPersonView');
      if (this.username) {
        this.$router.push({ name: 'PersonList' }).catch(() => {});
      }
    },
    async closeSession() {
      console.log('closeSession');
      await this.logout();
      this.$router.push({ name: 'Login' }).catch(() => {});
    },
  },
  async created() {
    // await this.authenticate().catch(() => {});
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