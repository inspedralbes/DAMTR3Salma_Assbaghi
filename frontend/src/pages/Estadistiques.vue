<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center">Estadístiques</h2>
        <v-card>
          <v-img
            src="http://localhost:4000/api/stats/nombre_partides_per_dia.png"
            alt="Estadístiques de partides"
            aspect-ratio="16/9"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Estadistiques',
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
}
</style>