<template>
  <div class="login">
    <v-container fill-height fluid>
      <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="login-form text-xs-center">
          <v-card light="light">
            <v-card-title class="headline text-center">
              <v-spacer />
              <v-icon class="mr-2" large="large">mdi-account</v-icon>
              Comin | LOGIN
              <v-spacer />
            </v-card-title>
            <v-card-text>
              <div class="subheading text-center">
                <template>Accede al sistema con tus credenciales</template>
              </div>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="form.user.value"
                  :rules="form.user.rules"
                  light="light"
                  prepend-icon="mdi-account"
                  label="Usuario"
                ></v-text-field>

                <v-text-field
                  v-model="form.password.value"
                  :rules="form.password.rules"
                  prepend-icon="mdi-lock"
                  label="Contraseña"
                  type="password"
                ></v-text-field>
                <br />
                <v-btn
                  color="primary"
                  block="block"
                  :loading="isLoading.loginRequest"
                  @click="login"
                >
                  Iniciar sesión
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar timeout="5000" v-model="isLoading.snackbar">
      Error al inicio de sesión.
      <template v-slot:action="{ attrs }"> Revise sus credenciales. </template>
    </v-snackbar>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import authService from '../services/auth.service';
import { LoginDto } from '../dto';

export default {
  name: 'Login',
  data() {
    return {
      authService: authService,
      isLoading: {
        snackbar: false,
        loginRequest: false,
      },
      form: {
        user: {
          value: null,
          rules: [(v) => !!v || 'El usuario es requerido'],
          errors: [],
        },
        password: {
          value: null,
          rules: [(v) => !!v || 'La contraseña es requerida'],
          errors: [],
        },
      },
    };
  },
  methods: {
    ...mapActions('auth', {
      loginAction: 'login',
    }),
    async login() {
      const isValid = this.$refs.form.validate();
      if (!isValid) {
        return;
      }

      const formData = LoginDto({
        username: this.form.user.value,
        password: this.form.password.value,
      });

      try {
        this.isLoading.loginRequest = true;
        const { token } = await authService.login({ data: formData });
        const { username } = await authService.authenticate();
        this.loginAction({
          user: username,
          token: token,
        });
        this.isLoading.loginRequest = false;
        this.$router.push({ name: 'DealList' });
      } catch (error) {
        this.isLoading.loginRequest = false;
        this.isLoading.snackbar = true;
        throw error;
      }
    },
  },
  async created() { },
};
</script>

<style>
.login-form {
  margin-top: 70px;
  max-width: 500px;
}
</style>