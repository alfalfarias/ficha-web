<template>
  <v-app-bar app color="primary" dark>
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2 logo"
      contain
      src="@/assets/logo.png"
      transition="scale-transition"
      width="40"
    />
    <v-toolbar-title>
      <v-btn @click="homeBtn" text class="btn-scraper"> Comin | Ficha PHP </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="username">
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-icon class="mr-1">mdi-account</v-icon>
            <span>{{ username }}</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="closeSessionBtn">
            <v-list-item-title>
              <v-icon class="mr-1">mdi-close</v-icon>
              <span>Cerrar sesión</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    username: {
      type: String,
      required: false,
    },
  },
  methods: {
    homeBtn() {
      this.$emit("homeBtn");
    },
    closeSessionBtn() {
      this.$emit("closeSessionBtn");
    },
  },
};
</script>
