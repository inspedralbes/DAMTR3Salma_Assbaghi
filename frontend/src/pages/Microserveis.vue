<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Control de microserveis</v-card-title>
          <v-card-text>
            <v-btn @click="toggleService" color="primary">{{ estat }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      estat: 'Encendre Servei'
    };
  },
  methods: {
    toggleService() {
      if (this.estat === 'Encendre Servei') {
        this.estat = 'Apagar Servei';
      } else {
        this.estat = 'Encendre Servei';
      }
    }
  }
};
</script>