<template>
  <v-container class="service-control-container" fluid>
    <v-card class="service-panel-card pa-6 elevation-4">
      <v-card-title class="service-title d-flex align-center justify-center mb-6">
        <v-icon start color="deep-purple-darken-3" class="mr-2">mdi-server</v-icon>
        Control de microserveis
      </v-card-title>

      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4" v-for="service in services" :key="service.name">
          <v-card class="service-card pa-4 d-flex justify-space-between align-center">
            <div>
              <h3 class="service-name">{{ service.label }}</h3>
              <div class="service-status">
                Estat: 
                <strong :class="service.active ? 'text-green' : 'text-red'">
                  {{ service.active ? 'Actiu' : 'Inactiu' }}
                </strong>
              </div>
            </div>

            <v-switch
              v-model="service.active"
              color="green"
              inset
              hide-details
              @change="toggleService(service)"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  { name: 'endpoints', label: 'Endpoints', active: true },
  { name: 'mysql', label: 'MySQL', active: true },
  { name: 'mongodb', label: 'MongoDB', active: true },
])

function toggleService(service) {
  console.log(`${service.name} -> ${service.active ? 'Encès' : 'Apagat'}`)
}
</script>

<style scoped>
.service-control-container {
  background-image: url('@/assets/login.png'); 
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 40px;
}

.service-panel-card {
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.service-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
}

.service-card {
  border-radius: 14px;
  background-color: #f9fafb;
  border: 1px solid #e0e0e0;
  transition: all 0.25s ease;
}

.service-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #34495e;
}

.service-status {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.text-green {
  color: #27ae60;
}

.text-red {
  color: #e74c3c;
}
</style>
