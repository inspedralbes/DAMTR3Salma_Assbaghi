<template>
  <v-container class="character-admin-container" fluid>
    <v-card class="character-panel-card pa-6 elevation-4">
      <v-card-title class="character-title d-flex align-center justify-center mb-6">
        <v-icon start color="blue-darken-3" class="mr-2">mdi-account-cog</v-icon>
        Gestió de personatges
      </v-card-title>

      <v-row dense>
        <v-col
          v-for="personatge in personatges"
          :key="personatge.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="character-card pa-4">
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <div class="character-name">{{ personatge.nom }}</div>
              </div>
              <v-btn icon class="delete-button" @click="eliminaPersonatge(personatge.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <v-text-field
              label="Velocitat (moveSpeed)"
              type="number"
              v-model.number="personatge.moveSpeed"
              variant="solo"
              color="indigo"
              class="mb-3"
              hide-details
              density="comfortable"
            />

            <v-text-field
              label="Multiplicador de monedes"
              type="number"
              v-model.number="personatge.coinMultiplier"
              variant="solo"
              color="teal"
              class="mb-4"
              hide-details
              density="comfortable"
            />

            <v-btn block color="green-darken-2" class="save-button" @click="guardarCanvis(personatge)">
              Guardar canvis
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { deletePersonatge, getPersonatge, updatePersonatge } from './comunicationManager'

const personatges = ref([])

async function fetchPersonatges() {
  try {
    personatges.value = await getPersonatge()
  } catch (error) {
    console.error('Error fetching personatges:', error)
  }
}

async function eliminaPersonatge(id) {
  try {
    await deletePersonatge(id)
    personatges.value = personatges.value.filter(j => j.id !== id)
  } catch (error) {
    console.error('Error deleting personatge:', error)
  }
}

async function guardarCanvis(personatge) {
  try {
    await updatePersonatge(personatge.id, {
      moveSpeed: personatge.moveSpeed,
      coinMultiplier: personatge.coinMultiplier
    })
    console.log('Canvis guardats correctament')
  } catch (error) {
    console.error('Error guardant canvis:', error)
  }
}

onMounted(fetchPersonatges)
</script>

<style scoped>
.character-admin-container {
  background: linear-gradient(to bottom, #87ceeb, #d0f0fd);
  padding-bottom: 60px;
  min-height: 100vh;
  background-image: url('@/assets/login.png'); 
  background-size: cover;
  background-position: center;
}

.character-panel-card {
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 18px;
  background-image: url('https://scoutsecuador.org/wp-content/uploads/2023/05/112-fondos-de-pantalla-de-super-mario-bros.-hd-imagenes-de-fondo-fondo-de-pantalla.-wallpaper-2k-de-mario-bros.jpg'); /* textura retro */
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
}

.character-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
}

.character-card {
  border-radius: 18px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.character-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.character-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}

.character-user {
  font-size: 0.85rem;
  color: #718096;
}

.delete-button {
  color: #ef4444;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #ffe4e6;
}

.save-button {
  font-weight: 600;
  border-radius: 10px;
  text-transform: none;
  color: white;
}
</style>
