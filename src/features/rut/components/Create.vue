<template>
  <v-card>
    <v-card-title class="headline success"> Nuevo RUT </v-card-title>

    <v-card-text>
      <br />
      <v-form ref="form" lazy-validation>
        <v-row align="center">
          <v-text-field
            :loading="dniLoading"
            v-model="form.dni.value"
            :counter="15"
            :rules="form.dni.rules"
            label="Rut"
            v-mask="[
              '#.###-X',
              '##.###-X',
              '###.###-X',
              '#.###.###-X',
              '##.###.###-X',
              '###.###.###-X',
              '#.###.###.###-X',
            ]"
            autofocus
            required
          ></v-text-field>
        </v-row>

        <v-row align="center">
          <v-checkbox
            v-model="form.botStatus.value"
            :true-value="BOT_STATUS.ENABLED"
            :false-value="BOT_STATUS.DISABLED"
            required
          ></v-checkbox>
          <span v-if="form.botStatus.value == BOT_STATUS.ENABLED"
            >Monitoreo <strong>activado</strong></span
          >
          <span v-else>Monitoreo <strong>desactivado</strong></span>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="default" class="mr-4" @click="close" :disabled="loading">
        Cancelar
      </v-btn>
      <v-btn color="success" @click="confirm" :loading="loading">
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mask } from "@/directives/mask";
import { BOT_STATUS } from "../dto";
import { format as rutFormat } from "../validators/rut";

export default {
  name: "RutCreate",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dniLoading: {
      type: Boolean,
      default: false,
    },
    dniRules: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  directives: {
    mask,
  },
  data() {
    return {
      BOT_STATUS: BOT_STATUS,
      form: {
        dni: {
          value: null,
          rules: [
            (v) => !!v || "El RUT es requerido",
            (v) => (v && v.length <= 15) || "Debe ser menor a 15 caracteres",
            (v) => rutFormat(v) || "Rut inválido",
            ...this.dniRules,
          ],
          errors: [],
        },
        botStatus: {
          value: BOT_STATUS.ENABLED,
          rules: [],
          errors: [],
        },
      },
    };
  },
  methods: {
    onChange() {
      console.log("onChange", this.form);
      console.log("onChange", this.form);
    },
    confirm() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        const formData = {
          dni: this.form.dni.value,
          botStatus: this.form.botStatus.value,
        };
        this.$emit("confirm", formData);
      } else {
        this.$emit("error");
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
