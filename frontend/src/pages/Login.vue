<template>
  <v-container class="login-container" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="login-card pa-6">
          <v-card-title class="justify-center">
            <span class="headline">LOGIN DE L'ADMIN</span>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin" class="d-flex flex-column gap-4">
              <v-text-field
                v-model="usuari"
                label="Usuari"
                required
                variant="solo"
                color="pink"
                prepend-inner-icon="mdi-account-heart"
              />
              <v-text-field
                v-model="contrassenya"
                label="Contrasenya"
                :type="showPassword ? 'text' : 'password'"
                required
                variant="solo"
                color="pink"
                prepend-inner-icon="mdi-lock-heart"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              />
              <v-btn type="submit" color="pink-darken-2" block class="login-button">
                INCIAR SESSIÓ
              </v-btn>
            </v-form>

            <v-alert
              v-if="error"
              type="error"
              dense
              class="mt-4 text-center"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from './comunicationManager'

const usuari = ref('')
const contrassenya = ref('')
const error = ref('')
const showPassword = ref(false)
const router = useRouter()

async function handleLogin() {
  try {
    error.value = ''
    const userData = await login(usuari.value, contrassenya.value)
    if (userData.jugador.admin == 1) {
      router.push('/microserveis')
    } else {
      error.value = 'No tens permís de administrador'
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #ffd8eb, #ffeaf5);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/login.png'); 
  background-size: cover;
  background-position: center;
}

.login-card {
  border-radius: 24px;
  background-color: #fff0f5;
  border: 3px dashed #ff69b4;
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.3);
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 32px rgba(255, 105, 180, 0.4);
}

.headline {
  font-size: 1.5rem;
  color: #d63384;
  text-align: center;
}

.login-button {
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  color: white;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: #ff85b3;
}
</style>
