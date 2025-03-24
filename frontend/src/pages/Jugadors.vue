<template>
  <v-container class="pa-6">
    <v-card class="pa-4 elevation-3">
      <v-card-title class="text-h5 font-weight-medium mb-4 text-center">
        Gestió de jugadors
      </v-card-title>

      <v-row dense>
        <v-col
          v-for="jugador in jugadors"
          :key="jugador.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="pa-3 d-flex justify-space-between align-center" outlined>
            <div>
              <div class="font-weight-medium text-body-1">
                {{ jugador.nom }}
              </div>
              <div class="text-subtitle-2 text-grey-darken-1">
                {{ jugador.usuari }}
              </div>
            </div>
            <v-btn icon color="red" @click="eliminaJugador(jugador.id)">
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
.v-card-title {
  font-size: 1.4rem;
  color: #2c3e50;
}

.v-card {
  border-radius: 12px;
}

.v-btn:hover {
  background-color: #ffebee;
}
</style>
