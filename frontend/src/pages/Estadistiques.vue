<template>
  <v-container>
    <v-row>
      <v-col v-for="stat in stats" :key="stat.name" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ stat.name }}</v-card-title>
          <v-card-subtitle>{{ stat.value }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        { name: 'Guanyades', value: 10 },
        { name: 'Perdudes', value: 5 },
        { name: 'Nivell', value: 'Or' }
      ]
    };
  }
};
</script>