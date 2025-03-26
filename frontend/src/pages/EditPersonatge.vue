<template>
  <v-container class="pa-6">
    <v-card class="pa-4 elevation-3">
      <v-card-title class="text-h5 font-weight-medium mb-4 text-center">
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
          <v-card class="pa-3" outlined>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="font-weight-medium text-body-1">
                  {{ personatge.nom }}
                </div>
                <div class="text-subtitle-2 text-grey-darken-1">
                  {{ personatge.usuari }}
                </div>
              </div>
              <v-btn icon color="red" @click="eliminaPersonatge(personatge.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <!-- Campos para editar moveSpeed y coinMultiplier -->
            <v-text-field
              label="Velocitat (moveSpeed)"
              type="number"
              v-model.number="personatge.moveSpeed"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-text-field
              label="Multiplicador de monedes"
              type="number"
              v-model.number="personatge.coinMultiplier"
              density="compact"
              hide-details
              class="mb-2"
            />

            <!-- Botón para guardar cambios -->
            <v-btn color="primary" block @click="guardarCanvis(personatge)">
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
