<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="player in players" :key="player.id">
        <v-card>
          <v-card-title>{{ player.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      players: [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' }
      ]
    };
  }
};
</script>