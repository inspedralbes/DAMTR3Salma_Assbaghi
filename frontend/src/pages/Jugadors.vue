<template>
  <v-container class="player-management-container" fluid>
    <v-card class="player-main-card pa-6 elevation-5">
      <v-card-title class="player-title">
        🎮 GESTIÓ DE JUGADORS
      </v-card-title>

      <v-row dense>
        <v-col
          v-for="jugador in jugadors"
          :key="jugador.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="player-card d-flex justify-space-between align-center">
            <div>
              <div class="player-name">
                {{ jugador.nom }}
              </div>
              <div class="player-user">
                {{ jugador.usuari }}
              </div>
            </div>
            <v-btn icon class="delete-btn" @click="eliminaJugador(jugador.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { deleteJugador, getJugadors } from './comunicationManager'

const jugadors = ref([])

async function fetchJugadors() {
  try {
    jugadors.value = await getJugadors()
  } catch (error) {
    console.error('Error fetching jugadors:', error)
  }
}

async function eliminaJugador(id) {
  try {
    await deleteJugador(id)
    jugadors.value = jugadors.value.filter(j => j.id !== id)
  } catch (error) {
    console.error('Error deleting jugador:', error)
  }
}

onMounted(fetchJugadors)
</script>

<style scoped>
.player-management-container {
  padding-bottom: 60px;
  min-height: 100vh;
  background-image: url('@/assets/login.png'); 
  background-size: cover;
  background-position: center;}

.player-main-card {
  border-radius: 24px;
  background-image: url('https://scoutsecuador.org/wp-content/uploads/2023/05/112-fondos-de-pantalla-de-super-mario-bros.-hd-imagenes-de-fondo-fondo-de-pantalla.-wallpaper-2k-de-mario-bros.jpg'); /* textura retro */
  background-size: cover;
  background-position: center;
  border: 4px solid #ff008c;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.player-title {
  text-align: center;
  font-size: 3rem;
  color: #040e42;
  margin-bottom: 30px;
}

.player-card {
  border-radius: 20px;
  padding: 20px;
  background-color: #fefefe;
  border: 3px solid #ff02a2;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.player-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.player-name {
  font-size: 0.9rem;
  color: #3742fa;
  margin-bottom: 5px;
}

.player-user {
  font-size: 0.8rem;
  color: #57606f;
}

.delete-btn {
  background-color: #ff6b81;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}

.delete-btn:hover {
  transform: scale(1.2) rotate(-10deg);
  background-color: #ff4757;
}
</style>
