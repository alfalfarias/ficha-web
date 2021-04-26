<template>
  <v-card>
    <v-card-title class="headline error">
      ¿Está seguro que desea eliminar este registro?
    </v-card-title>

    <v-card-text>
      <br />
      <div class="center">
        Rut: <strong>{{ item.dni }}</strong>
      </div>
      <div class="center">
        Última actualización {{ item.updatedAt | humantime }}.
      </div>
    </v-card-text>

    <v-card-actions>
      <div>
        <v-chip v-if="item.botStatus == 'ENABLED'" color="primary" dark>
          Monitoreo activado
        </v-chip>
        <v-chip v-if="item.botStatus == 'DISABLED'" color="default">
          Monitoreo desactivado
        </v-chip>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="default" @click="close" :disabled="loading">Cancel</v-btn>
      <v-btn color="error" @click="confirm" :loading="loading">Confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { humantime } from "@/filters/datetime";

export default {
  name: "RemoveConfirm",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    humantime,
  },
  methods: {
    close() {
      this.$emit("close", this.item);
    },
    confirm() {
      this.$emit("confirm", this.item);
    },
  },
};
</script>

<style scoped>
</style>
