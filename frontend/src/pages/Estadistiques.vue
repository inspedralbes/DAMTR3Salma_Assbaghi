<template>
  <v-container class="stats-background" fluid>
    <v-row justify="center" class="py-10">
      <v-col cols="12" sm="10" md="8">
        <h1 class="stats-title">📊 Estadístiques de Partida</h1>
        <v-card class="mario-card mb-6" elevation="12">
          <v-img
            src="http://supermariobros.dam.inspedralbes.cat:25670/api/estadistiques"
            alt="Estadístiques de partides"
            aspect-ratio="16/9"
            class="mario-img"
            cover
          />
        </v-card>

        <h1 class="stats-title">👥 Estadístiques d'Usuaris</h1>
        <v-card class="mario-card" elevation="12">
          <v-img
            src="http://supermariobros.dam.inspedralbes.cat:25670/api/estadistiques_usuaris"
            alt="Estadístiques de partides"
            aspect-ratio="16/9"
            class="mario-img"
            cover
          />
        </v-card>

        <h1 class="stats-title"> Estadístiques Millor Jugador</h1>
        <v-card class="mario-card" elevation="12">
          <v-img
            src="http://supermariobros.dam.inspedralbes.cat:25670/api/estadistiques_jugadors"
            alt="Estadístiques de jugadors"
            aspect-ratio="16/9"
            class="mario-img"
            cover
          />
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.stats-background {
  background: linear-gradient(to bottom, #1290ff, #006eff); 
  min-height: 100vh;
  background-image: url('@/assets/login.png'); 
  background-size: cover;
  background-position: center;
}

.stats-title {
  color: #ca0516;
  text-align: center;
  margin-bottom: 20px;
}

.mario-card {
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid #ffa502;
  background-color: #fefefe;
  transition: transform 0.3s ease-in-out;
}

.mario-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.mario-img {
  object-fit: cover;
  border-radius: 0;
}
</style>

