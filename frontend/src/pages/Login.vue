<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="usuari"
                label="Usuari"
                required
                prepend-icon="mdi-account"
              />
              <v-text-field
                v-model="contrassenya"
                label="Contrasenya"
                type="contrassenya"
                required
                prepend-icon="mdi-lock"
              />
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
            <v-alert
              v-if="error"
              type="error"
              dense
              class="mt-3"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from './comunicationManager';
const usuari = ref('');
const contrassenya = ref('');
const error = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    error.value = '';
    const userData = await login(usuari.value, contrassenya.value);
    // localStorage.setItem('token', userData.token);
    router.push('/microserveis');
  } catch (err) {
    error.value = err.message;
  }
}
</script>
