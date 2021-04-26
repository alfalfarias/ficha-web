<template>
  <v-footer dark padless>
    <v-card class="flex">
      <v-card-title class="primary">
        <div class="subheading">
          © {{ new Date().getFullYear() }} — <strong>Comin</strong>
        </div>
        <v-spacer></v-spacer>
        <v-btn dark icon class="mr-1" :href="href" target="_blank">
          <v-icon size="24px"> mdi-open-in-new </v-icon>
        </v-btn>
        <div>Conectamos empresas con clientes.</div>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>