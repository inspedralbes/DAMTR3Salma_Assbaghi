<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Microservices Control</v-card-title>
          <v-card-text>
            <v-btn @click="toggleService" color="primary">{{ serviceStatus }}</v-btn>
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
      serviceStatus: 'Start Service'
    };
  },
  methods: {
    toggleService() {
      if (this.serviceStatus === 'Start Service') {
        this.serviceStatus = 'Stop Service';
      } else {
        this.serviceStatus = 'Start Service';
      }
    }
  }
};
</script>